import { Usuario } from "@/services/api";

// Guarda quem fez login (fica na memória até fechar o app)
let usuarioLogado: Usuario | null = null;

export function salvarUsuario(usuario: Usuario | null) {
  usuarioLogado = usuario;
}

export function pegarUsuario() {
  return usuarioLogado;
}