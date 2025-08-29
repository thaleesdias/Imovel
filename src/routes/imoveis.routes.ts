import Router from "express";

import {
  criarImovelController,
  deleteImovelController,
  listarImoveisController,
  mudarStatusController,
} from "../controllers/imoveis.controller";

const router = Router();

router.get("/all", listarImoveisController);

router.post("/create", criarImovelController);

router.delete("/delete/:id", deleteImovelController);

router.patch("/status/:id", mudarStatusController);

export default router;
