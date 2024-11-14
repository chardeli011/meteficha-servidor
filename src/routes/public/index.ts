import { Router } from "express";
import { router } from "../router";
import { prisma } from "../../../prisma/connection";

export const routerPublic = Router();

routerPublic.get("/create-lead", async (req, res) => {
  console.log(req.body);
  console.log(req.query);

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
