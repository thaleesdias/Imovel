export type StatusImovel = "disponivel" | "vendido" | "alugado";

export interface Imovel {
  id?: number;
  endereco: string;
  telefone_vendedor: string;
  nome_vendedor: string;
  status?: StatusImovel;
}
