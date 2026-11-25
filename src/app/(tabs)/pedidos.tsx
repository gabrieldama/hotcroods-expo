import { paleta } from "@/constants/paleta";
import { pegarUsuario } from "@/data/sessao";
import { buscarUsuario, Usuario } from "@/services/api";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Usuario["pedidos"]>([]);
  const [carregando, setCarregando] = useState(true);

  // Toda vez que a aba abrir, busca os pedidos do usuário na API
  useFocusEffect(
    useCallback(() => {
      const usuario = pegarUsuario();
      if (!usuario) return;
      setCarregando(true);
      buscarUsuario(usuario.id) // GET /usuario/{id} (os pedidos vêm junto)
        .then((u) => setPedidos(u.pedidos))
        .catch(() => setPedidos([]))
        .finally(() => setCarregando(false));
    }, []),
  );

  if (!pegarUsuario()) {
    return (
      <View style={s.tela}>
        <Text>Faça login para ver seus pedidos.</Text>
      </View>
    );
  }

  return (
    <View style={s.tela}>
      <Text style={s.titulo}>Pedidos</Text>
      {carregando ? (
        <ActivityIndicator size="large" color={paleta.vermelho} />
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(p) => String(p.id)}
          ListEmptyComponent={<Text>Você ainda não fez pedidos.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={s.caixa}
              onPress={() =>
                router.push({ pathname: "/pedido/[id]", params: { id: String(item.id) } })
              }
            >
              <Text style={s.texto}>Pedido</Text>
              <Text style={s.id}>Id: {String(item.id).padStart(3, "0")}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo, padding: 20, paddingTop: 50 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 24 },
  caixa: { backgroundColor: paleta.branco, borderRadius: 14, padding: 16, marginBottom: 16 },
  texto: { fontSize: 15, fontWeight: "bold" },
  id: { fontSize: 11, fontWeight: "bold" },
});