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
  let res: QueryResult;
  if (!imovel.status) {
    res = await pool.query(
      `INSERT INTO imoveis (endereco, telefone_vendedor, nome_vendedor)VALUES ($1, $2, $3);`,
      [imovel.endereco, imovel.telefone_vendedor, imovel.nome_vendedor]
    );
  } else {
    res = await pool.query(
      `INSERT INTO imoveis (endereco, telefone_vendedor, nome_vendedor,status)
  VALUES ($1, $2, $3, $4);`,
      [
        imovel.endereco,
        imovel.telefone_vendedor,
        imovel.nome_vendedor,
        imovel.status ?? "disponivel",
      ]
    );
  }
  return res;
}
