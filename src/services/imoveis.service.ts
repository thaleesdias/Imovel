import pool from "../database/Pool";
import { QueryResult } from "pg";
import { Imovel, StatusImovel } from "../types/imovel";

export async function listarTodos() {
  try {
    const result = await pool.query("SELECT * FROM imoveis");
    return result.rows;
  } catch (err) {
    console.error("Erro aolistar imoveisl:", err);
    throw err;
  }
}

export async function criarImovel(imovel: Imovel) {
  try {
    const result: QueryResult = await pool.query(
      `INSERT INTO imoveis (endereco, telefone_vendedor, nome_vendedor, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *;`,
      [
        imovel.endereco,
        imovel.telefone_vendedor,
        imovel.nome_vendedor,
        imovel.status,
      ]
    );
    return result;
  } catch (err) {
    console.error("Erro ao criar imóvel:", err);
    throw err;
  }
}

export async function atualizarStatusImovel(id: string, status: StatusImovel) {
  try {
    const result = await pool.query(
      "UPDATE imoveis SET status=$1 WHERE id=$2",
      [status, id]
    );
    return result;
  } catch (err) {
    console.error("Erro ao atualizar status do imóvel:", err);
    throw err;
  }
}

export async function deleteImovel(id: string) {
  try {
    const result = await pool.query("DELETE FROM imoveis WHERE id=$1", [id]);
    return result;
  } catch (err) {
    console.error("Erro ao criar imóvel:", err);
    throw err;
  }
}
