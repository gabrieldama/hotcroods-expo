import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { StatusChip } from "@/components/StatusChip";
import { paleta } from "@/constants/paleta";
import { pedidos } from "@/data/carrinho";

export default function Pedidos() {
  const [, setAtualizar] = useState(0);

  // Redesenha sempre que a aba abrir (para mostrar pedidos novos)
  useFocusEffect(useCallback(() => setAtualizar((n) => n + 1), []));

  return (
    <View style={s.tela}>
      <Text style={s.titulo}>Pedidos</Text>
      <FlatList
        data={[...pedidos]}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.caixa}
            onPress={() => router.push({ pathname: "/pedido/[id]", params: { id: String(item.id) } })}
          >
            <View>
              <Text style={s.texto}>Status do pedido:</Text>
              <Text style={s.id}>Id: {String(item.id).padStart(3, "0")}</Text>
            </View>
            <StatusChip status={item.status} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo, padding: 20, paddingTop: 50 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 24 },
  caixa: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: paleta.branco,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  texto: { fontSize: 15, fontWeight: "bold" },
  id: { fontSize: 11, fontWeight: "bold" },
});
