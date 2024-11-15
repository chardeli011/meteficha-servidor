import { Router } from "express";
import { router } from "../router";
import { prisma } from "../../../prisma/connection";
import formidable from "formidable";

export const routerPublic = Router();

routerPublic.get("/create-lead", async (req, res) => {
  //vai receber um formData com os dados do lead
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields) => {
    if (err) {
      res.status(400).send("Bad request");
      return;
    }

    const { name, email, phone } = fields;

    if (!name || !email || !phone) {
      res.status(400).send("Missing fields");
      return;
    }

    try {
      await prisma.lead.create({
        data: {
          nome: name[0],
          telefone: phone[0],
        },
      });
    } catch (error) {
      res.status(500).send("Internal server error");
      return;
    }

    res.status(200).send("Lead created");
  });

  res.status(200).send("Lead created");
});

routerPublic.get("/get-leads", async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).send({
      data: leads,
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      error: "Internal server error",
      data: null,
    });
  }
});
