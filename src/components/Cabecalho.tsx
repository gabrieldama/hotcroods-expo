import { paleta } from "@/constants/paleta";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Cabecalho({ titulo }: { titulo: string }) {
  return (
    <View style={s.linha}>
      <TouchableOpacity style={s.voltar} onPress={() => router.back()}>
        <Text style={s.seta}>←</Text>
      </TouchableOpacity>
      <Text style={s.titulo}>{titulo}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  linha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  voltar: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: paleta.branco,
    alignItems: "center",
    justifyContent: "center",
  },
  seta: { fontSize: 16, fontWeight: "bold" },
  titulo: { fontSize: 20, fontWeight: "bold" },
});
