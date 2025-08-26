import pool from "../database/Pool";
import { QueryResult } from "pg";
import { Imovel } from "../types/imovel";

export async function listarTodos() {
  const result = await pool.query("SELECT * FROM imoveis");
  return result.rows;
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
        imovel.status ?? "disponivel",
      ]
    );
    return result;
  } catch (err) {
    console.error("Erro ao criar imóvel:", err);
    throw err;
  }
}
