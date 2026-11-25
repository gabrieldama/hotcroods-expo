import { Cabecalho } from "@/components/Cabecalho";
import { paleta } from "@/constants/paleta";
import { buscarPedido, formatarPreco, Pedido } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// Igual ao detalhes.tsx do SenaiFlix: pega o id e busca na API
export default function MeuPedido() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarPedido(id) // GET /pedido/{id}
      .then(setPedido)
      .catch(() => setPedido(null))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) {
    return (
      <View style={s.tela}>
        <ActivityIndicator size="large" color={paleta.vermelho} />
      </View>
    );
  }

  if (!pedido) {
    return (
      <View style={s.tela}>
        <Cabecalho titulo="Meu pedido" />
        <Text>Pedido não encontrado.</Text>
      </View>
    );
  }

  // A API não manda o total: somamos os valores
  let total = 0;
  for (const p of pedido.produtos) total += p.valor;

  return (
    <View style={s.tela}>
      <Cabecalho titulo="Meu pedido" />

      <View style={s.lista}>
        {pedido.produtos.map((p, i) => (
          <View key={i} style={s.item}>
            <Text style={s.nome}>{p.nome}</Text>
            <Text style={s.preco}>{formatarPreco(p.valor)}</Text>
          </View>
        ))}
      </View>

      <View style={s.totalCaixa}>
        <Text style={s.totalRotulo}>Total</Text>
        <Text style={s.totalValor}>{formatarPreco(total)}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo, padding: 20, paddingTop: 50 },
  lista: { backgroundColor: paleta.branco, borderRadius: 14, padding: 20, gap: 16 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: paleta.vermelho,
    borderRadius: 11,
    padding: 16,
  },
  nome: { fontSize: 16, fontWeight: "600", color: paleta.branco },
  preco: { color: paleta.branco },
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
  totalRotulo: { fontSize: 15, color: paleta.textoPreco },
  totalValor: { fontSize: 24, color: paleta.textoPreco },
});