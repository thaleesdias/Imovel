import pool from "../database/Pool";
import { QueryResult } from "pg";

export async function listarTodos() {
  const res = await pool.query("SELECT * FROM imoveis");
  return res.rows;
}

interface imovel {
  endereco: string;
  telefone_vendedor?: string;
  nome_vendedor?: string;
  status?: string;
}

export async function criarImovel(imovel: imovel) {
  try {
    const res: QueryResult = await pool.query(
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
    return res; // retorna o resultado pro controller
  } catch (err) {
    console.error("Erro ao criar imóvel:", err);
    throw err; // relança o erro pra ser tratado no controller
  }
}
