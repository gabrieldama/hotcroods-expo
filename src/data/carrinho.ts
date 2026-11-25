import { Produto } from "@/services/api";

// Guarda o produto e a quantidade: { idDoProduto: { produto, quantidade } }
const carrinho: Record<number, { produto: Produto; quantidade: number }> = {};

// Quantas unidades desse produto estão no carrinho
export function quantidade(id: number) {
  return carrinho[id]?.quantidade ?? 0;
}

// Soma 1 (se não existe, adiciona com 1)
export function aumentar(produto: Produto) {
  carrinho[produto.id] = { produto, quantidade: quantidade(produto.id) + 1 };
}

// Tira 1 (se chegar a 0, apaga)
export function diminuir(produto: Produto) {
  if (quantidade(produto.id) <= 1) {
    delete carrinho[produto.id];
  } else {
    carrinho[produto.id].quantidade -= 1;
  }
}

// Lista o que está no carrinho
export function itensDoCarrinho() {
  return Object.values(carrinho);
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