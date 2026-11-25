// Endereço da API do grupo (já está na internet, funciona no celular)
const BASE = "https://hotcroods.onrender.com";

// ===== Tipos (iguais ao que a API devolve) =====
export type Produto = {
  id: number;
  nome: string;
  valor: number;
  quantidade: number; // estoque
  categoriaProduto: string; // "SALGADO", "BEBIDA", "DOCE"
  url: string; // foto
  disponivel: boolean;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  pedidos: { id: number; produtos: Produto[] }[];
};

export type Pedido = {
  id: number;
  produtos: Produto[];
  usuarioID: number;
};

// ===== Funções base =====

// GET: busca dados (igual ao "pegar" do SenaiFlix)
async function pegar(caminho: string) {
  const resposta = await fetch(BASE + caminho);
  if (!resposta.ok) throw new Error("Erro " + resposta.status);
  return resposta.json();
}

// POST / PUT: envia dados em JSON
async function enviar(metodo: "POST" | "PUT", caminho: string, dados: object) {
  const resposta = await fetch(BASE + caminho, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const texto = await resposta.text(); // algumas rotas não devolvem nada
  const json = texto ? JSON.parse(texto) : null;
  if (!resposta.ok) throw new Error(json?.erro ?? "Erro " + resposta.status);
  return json;
}

// ===== Produtos =====
// categoria: "Todos", "Salgados", "Bebidas" ou "Doces"
export function listarProdutos(categoria: string): Promise<Produto[]> {
  if (categoria === "Todos") return pegar("/produto");
  return pegar("/produto/" + categoria.toLowerCase()); // /produto/salgados
}

// ===== Usuário =====
export function login(email: string, senha: string): Promise<Usuario> {
  return enviar("POST", "/usuario/login", { email, senha });
}

export function cadastrar(nome: string, cpf: string, email: string, senha: string) {
  return enviar("POST", "/usuario", { nome, cpf, email, senha });
}

export function esqueceuSenha(email: string, novaSenha: string) {
  return enviar("PUT", "/usuario/esqueceu-senha", { email, novaSenha });
}

export function buscarUsuario(id: number): Promise<Usuario> {
  return pegar("/usuario/" + id);
}

export function atualizarUsuario(id: number, nome: string, cpf: string, email: string, senha: string) {
  return enviar("PUT", "/usuario/" + id, { nome, cpf, email, senha });
}

// ===== Pedidos =====
// A API procura o produto pelo NOME
export function criarPedido(usuarioId: number, produtos: { nome: string; quantidade: number }[]) {
  return enviar("POST", "/pedido", { usuarioId, produtos });
}

export function buscarPedido(id: string): Promise<Pedido> {
  return pegar("/pedido/" + id);
}

// ===== Ajudante =====
// 5 -> "R$ 5.00"
export function formatarPreco(valor: number) {
  return "R$ " + Number(valor).toFixed(2);
}