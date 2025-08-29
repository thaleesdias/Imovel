import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware";
import {
  criarUsuario,
  listarUsuarios,
  logarUsuario,
} from "../controllers/user.controller";

const router = Router();

router.get("/", authMiddleware, listarUsuarios);

router.post("/create", criarUsuario);

router.post("/login", logarUsuario);

export default router;
