import { PRODUTOS, Produto } from './produtos';

// ===== CARRINHO =====
// Guarda quantas unidades de cada produto: { idDoProduto: quantidade }
// Ex.: { 1: 2, 6: 1 } = 2 coxinhas e 1 coca
const carrinho: Record<number, number> = {};

// Quantas unidades desse produto estão no carrinho
export function quantidade(id: number) {
  return carrinho[id] ?? 0;
}

// Soma 1
export function aumentar(id: number) {
  carrinho[id] = quantidade(id) + 1;
}

// Tira 1 (se chegar a 0, apaga)
export function diminuir(id: number) {
  if (quantidade(id) <= 1) {
    delete carrinho[id];
  } else {
    carrinho[id] = quantidade(id) - 1;
  }
}

// Lista só os produtos que estão no carrinho, com a quantidade
export function itensDoCarrinho() {
  const itens: { produto: Produto; quantidade: number }[] = [];
  for (const produto of PRODUTOS) {
    if (quantidade(produto.id) > 0) {
      itens.push({ produto, quantidade: quantidade(produto.id) });
    }
  }
  return itens;
}

// Soma de (preço x quantidade)
export function totalDoCarrinho() {
  let total = 0;
  for (const item of itensDoCarrinho()) {
    total += item.produto.valor * item.quantidade;
  }
  return total;
}

// Esvazia
export function limparCarrinho() {
  for (const id in carrinho) delete carrinho[id];
}

// ===== PEDIDOS =====
export type Pedido = {
  id: number;
  itens: { produto: Produto; quantidade: number }[];
  total: number;
  status: 'Finalizado' | 'Em andamento';
};

// Começa com 1 pedido de exemplo (igual ao Figma)
export const pedidos: Pedido[] = [
  {
    id: 1,
    itens: [
      { produto: PRODUTOS[0], quantidade: 1 },
      { produto: PRODUTOS[1], quantidade: 1 },
      { produto: PRODUTOS[2], quantidade: 1 },
    ],
    total: 23,
    status: 'Finalizado',
  },
];

// Transforma o carrinho em um pedido novo e esvazia o carrinho
export function finalizarPedido() {
  pedidos.push({
    id: pedidos.length + 1,
    itens: itensDoCarrinho(),
    total: totalDoCarrinho(),
    status: 'Em andamento',
  });
  limparCarrinho();
}
