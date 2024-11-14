import { Router } from "express";
import { router } from "../router";
import { prisma } from "../../../prisma/connection";
import formidable from "formidable";

export const routerPublic = Router();

routerPublic.get("/create-lead", async (req, res) => {
  const form = new formidable.IncomingForm();
  console.log(req.body);
  console.log(req.query);

  form.parse(req, (err, fields) => {
    if (err) {
      res.status(500).send("Erro ao processar o formulário");
      return;
    }
    console.log(fields); // Campos do formulário enviados
    res.send("Dados recebidos com sucesso!");
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
