import { error } from "node:console";
import pool from "../database/Pool";
import { User } from "../types/user";
import { comparePassword, hashPassword } from "../utils/hash";
import jwt from "jsonwebtoken";

export async function allUser() {
  const result = await pool.query("SELECT * FROM usuarios;");

  return result.rows;
}

export async function createUser(user: User) {
  const existingUser = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [user.email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email já cadastrado!");
  }

  const hashedPassword = await hashPassword(user.senha);

  try {
    const result = pool.query(
      "INSERT INTO usuarios(nome, email,senha) VALUES($1,$2,$3)",
      [user.nome, user.email, hashedPassword]
    );
  } catch (err) {
    console.log(err);
  }
}

export async function loginUser(email: string, senha: string) {
  const result = await pool.query("SELECT * FROM usuarios WHERE email=$1", [
    email,
  ]);

  const user: User = result.rows[0];

  if (!user) {
    throw new Error("usuario nao encontrado");
  }

  const isValid = await comparePassword(senha, user.senha);

  if (!isValid) throw new Error("Senha incorreta");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return {
    message: "Login realizado com sucesso",
    user: { nome: user.nome, email: user.email },
    token,
  };
}

async function deleteUser(id: Number) {}
