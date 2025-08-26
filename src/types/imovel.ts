export interface Imovel {
  id?: number;
  endereco: string;
  telefone_vendedor: string;
  nome_vendedor: string;
  status?: "disponivel" | "vendido" | string;
}
