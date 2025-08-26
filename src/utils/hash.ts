import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const saltRounds = 8;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
}

export async function comparePassword(password: string, hashPassword: string) {
  const match = bcrypt.compare(password, hashPassword);

  return match;
}
