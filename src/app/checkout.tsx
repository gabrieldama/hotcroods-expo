import { Botao } from "@/components/Botao";
import { Cabecalho } from "@/components/Cabecalho";
import { paleta } from "@/constants/paleta";
import { itensDoCarrinho, limparCarrinho, totalDoCarrinho } from "@/data/carrinho";
import { pegarUsuario } from "@/data/sessao";
import { criarPedido, formatarPreco } from "@/services/api";
import { router } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

export default function Checkout() {
  const itens = itensDoCarrinho();

  async function finalizar() {
    const usuario = pegarUsuario();
    if (!usuario) {
      Alert.alert("Atenção", "Faça login antes de pedir.");
      return;
    }
    try {
      // A API espera: { usuarioId, produtos: [{ nome, quantidade }] }
      const produtos = itens.map((i) => ({ nome: i.produto.nome, quantidade: i.quantidade }));
      await criarPedido(usuario.id, produtos); // POST /pedido
      limparCarrinho();
      router.dismissAll();
      router.replace("/pedidos");
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível finalizar o pedido.");
    }
  }

  return (
    <View style={s.tela}>
      <Cabecalho titulo="Checkout" />
      <Text style={s.resumo}>Resumo</Text>

      <FlatList
        data={itens}
        keyExtractor={(i) => String(i.produto.id)}
        renderItem={({ item }) => (
          <View style={s.item}>
            <Text style={s.nome}>{item.produto.nome}</Text>
            <Text style={s.qtd}>{item.quantidade} x</Text>
            <Text>{formatarPreco(item.produto.valor)}</Text>
          </View>
        )}
      />

      <View style={s.totalLinha}>
        <Text style={s.total}>Total</Text>
        <Text style={s.total}>{formatarPreco(totalDoCarrinho())}</Text>
      </View>

      <Botao texto="Finalizar pedido" onPress={finalizar} />
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo, padding: 25, paddingTop: 50 },
  resumo: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: paleta.branco,
    borderRadius: 11,
    padding: 20,
    marginBottom: 16,
  },
  nome: { flex: 1, fontSize: 16, fontWeight: "600" },
  qtd: { fontWeight: "600", marginRight: 8 },
  totalLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: paleta.bordaCampo,
    paddingVertical: 12,
    marginBottom: 20,
  },
  total: { fontSize: 15, color: paleta.textoPreco },
});