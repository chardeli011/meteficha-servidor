import { Router } from "express";

export const routerPublic = Router();

routerPublic.get("/create-lead", (req, res) => {
  console.log(req.body);

  res.status(200).send("Lead created");
});
