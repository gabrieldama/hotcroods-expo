import { Cabecalho } from "@/components/Cabecalho";
import { StatusChip } from "@/components/StatusChip";
import { paleta } from "@/constants/paleta";
import { pedidos } from "@/data/carrinho";
import { formatarPreco } from "@/data/produtos";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// Igual ao detalhes.tsx do SenaiFlix: pega o id da rota e procura o pedido
export default function MeuPedido() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pedido = pedidos.find((p) => p.id === Number(id));

  if (!pedido) {
    return (
      <View style={s.tela}>
        <Cabecalho titulo="Meu pedido" />
        <Text>Pedido não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={s.tela}>
      <Cabecalho titulo="Meu pedido" />

      <View style={s.status}>
        <Text style={s.statusTexto}>Status do pedido:</Text>
        <StatusChip status={pedido.status} />
      </View>

      <View style={s.lista}>
        {pedido.itens.map((item) => (
          <View key={item.produto.id} style={s.item}>
            <Text style={s.nome}>
              {item.quantidade}x {item.produto.nome}
            </Text>
            <Text style={s.preco}>
              {formatarPreco(item.produto.valor * item.quantidade)}
            </Text>
          </View>
        ))}
      </View>

      <View style={s.totalCaixa}>
        <Text style={s.totalRotulo}>Total</Text>
        <Text style={s.totalValor}>{formatarPreco(pedido.total)}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: paleta.fundo,
    padding: 20,
    paddingTop: 50,
  },
  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: paleta.branco,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  statusTexto: {
    fontSize: 15,
    fontWeight: "bold",
  },
  lista: {
    backgroundColor: paleta.branco,
    borderRadius: 14,
    padding: 20,
    gap: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: paleta.vermelho,
    borderRadius: 11,
    padding: 16,
  },
  nome: {
    fontSize: 16,
    fontWeight: "600",
    color: paleta.branco,
  },
  preco: {
    color: paleta.branco,
  },
  totalCaixa: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: paleta.branco,
    borderRadius: 14,
    padding: 20,
    marginTop: "auto",
    marginBottom: 20,
  },
  totalRotulo: {
    fontSize: 15,
    color: paleta.textoPreco,
  },
  totalValor: {
    fontSize: 24,
    color: paleta.textoPreco,
  },
});
