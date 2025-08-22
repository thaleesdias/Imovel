import { Router } from "express";
import { allUser, createUser } from "../services/user.service";

const router = Router();

router.get("/all", async (req, res) => {
  const result = await allUser();

  return res.json(result).status(200);
});

router.post("/create", async (req, res) => {
  const { nome, email, senha } = req.body;

  const user = {
    nome,
    email,
    senha,
  };

  const result = await createUser(user);
  res.json(result);
});

export default router;
