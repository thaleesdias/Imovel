import pool from "../database/Pool";

interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

export async function allUser() {
  const query = await pool.query("SELECT * FROM usuarios;");

  return query.rows;
}

export async function createUser(user: User) {
  try {
    const result = pool.query(
      "INSERT INTO usuarios(nome, email,senha) VALUES($1,$2,$3)",
      [user.nome, user.email, user.senha]
    );
  } catch (err) {
    return;
  }
}
