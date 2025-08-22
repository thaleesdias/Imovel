import Router from "express";
import { listarTodos, criarImovel } from "../services/imoveis.service";

const router = Router();

router.get("/", (req, res) => {
  return res.send("oi").status(200);
});

router.get("/all", async (req, res) => {
  try {
    const imoveis = await listarTodos();
    res.json(imoveis); // envia a lista pro cliente
  } catch (error) {
    console.error("Erro ao listar imóveis:", error);
    res.status(500).json({ message: "Erro ao buscar imóveis" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { endereco, telefone_vendedor, nome_vendedor, status } = req.body;

    console.log(endereco, telefone_vendedor, nome_vendedor, status);
    const novoImovel = await criarImovel({
      endereco,
      telefone_vendedor,
      nome_vendedor,
      status,
    });

    return res.status(201).json(novoImovel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar imóvel" });
  }
});

export default router;
