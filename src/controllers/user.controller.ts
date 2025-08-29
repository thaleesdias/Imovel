import { Request, Response } from "express";
import { allUser, createUser, loginUser } from "../services/user.service";

export async function listarUsuarios(req: Request, res: Response) {
  try {
    const result = await allUser();

    return res.json(result).status(200);
  } catch (err) {}
}
export async function logarUsuario(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;

    const result = await loginUser(email, senha);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function criarUsuario(req: Request, res: Response) {
  try {
    const { nome, email, senha } = req.body;

    const user = {
      nome,
      email,
      senha,
    };

    const result = await createUser(user);

    res.json(result);
  } catch (err: any) {
    console.log(err);

    if (err.message === "Email já cadastrado!") {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
