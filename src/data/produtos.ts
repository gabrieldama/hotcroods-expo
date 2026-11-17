export type Produto = {
  id: number;
  nome: string;
  valor: number;
  categoria: string;
};

export const PRODUTOS: Produto[] = [
  { id: 1, nome: "Coxinha de Frango", valor: 8, categoria: "Salgados" },
  { id: 2, nome: "Risole de Queijo", valor: 7, categoria: "Salgados" },
  { id: 3, nome: "Pão de Queijo", valor: 8, categoria: "Salgados" },
  { id: 4, nome: "Mousse de Limão", valor: 10, categoria: "Doces" },
  { id: 5, nome: "Enroladinho Salsicha", valor: 7, categoria: "Salgados" },
  { id: 6, nome: "Coca-Cola 255ml", valor: 5, categoria: "Bebidas" },
  { id: 7, nome: "Pepsi 255ml", valor: 5, categoria: "Bebidas" },
];

// 8 -> "R$ 8.00"
export function formatarPreco(valor: number) {
  return "R$ " + valor.toFixed(2);
}
