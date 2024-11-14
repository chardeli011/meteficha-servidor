import { Request, Response } from "express";
import { randomUUID } from "crypto";
export const create = async (req: Request, res: Response) => {
  const { name, email, gender, age, password } = req.body;
  const uuid = randomUUID();
  if (!name || !email || !gender || !age || !password) {
    return res.status(422).json({ message: "Dados inválidos" });
  }
  return res.status(201).json({ id: uuid });
};
