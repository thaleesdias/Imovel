import { Request, Response } from "express";

import { StatusImovel } from "../types/imovel";
import {
  listarTodos,
  criarImovel,
  deleteImovel,
  atualizarStatusImovel,
} from "../services/imoveis.service";

export async function criarImovelController(req: Request, res: Response) {
  try {
    const { endereco, telefone_vendedor, nome_vendedor, status } = req.body;

    if (!endereco || !telefone_vendedor || !nome_vendedor) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const statusValido = status ?? "disponivel";

    const STATUS_VALIDOS = ["disponivel", "vendido", "alugado"];
    if (!STATUS_VALIDOS.includes(statusValido)) {
      return res.status(400).json({ error: "Status inválido" });
    }

    const novoImovel = await criarImovel({
      endereco,
      telefone_vendedor,
      nome_vendedor,
      status: statusValido,
    });

    return res.status(201).json(novoImovel.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar imóvel" });
  }
}

export async function mudarStatusController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status);
    console.log(id);

    if (!status) {
      return res.status(400).json({ error: "O status é obrigatório" });
    }

    const STATUS_VALIDOS: StatusImovel[] = ["disponivel", "vendido", "alugado"];

    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({
        error: `Status inválido. Use apenas: ${STATUS_VALIDOS.join(", ")}`,
      });
    }

    const result = await atualizarStatusImovel(
      String(id),
      status as StatusImovel
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }

    return res
      .status(200)
      .json({ message: `Status atualizado para ${status}` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function listarImoveisController(req: Request, res: Response) {
  try {
    const imoveis = await listarTodos();
    res.json(imoveis);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar imóveis" });
  }
}

export async function deleteImovelController(req: Request, res: Response) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID do imóvel é obrigatório" });
    }

    const result = await deleteImovel(id); // 👈 agora com await

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }

    return res.status(200).json({ message: "Imóvel deletado com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar imóvel:", err);
    return res
      .status(500)
      .json({ error: "Erro no servidor ao deletar imóvel" });
  }
}
