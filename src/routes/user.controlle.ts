import { Router } from "express";
import { allUser, createUser, loginUser } from "../services/user.service";

const router = Router();

router.get("/", async (req, res) => {
  const result = await allUser();

  return res.json(result).status(200);
});

router.post("/create", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const user = {
      nome,
      email,
      senha,
    };

    const result = await createUser(user);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const result = await loginUser(email, senha);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
