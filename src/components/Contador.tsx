import { paleta } from "@/constants/paleta";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  quantidade: number;
  aoAumentar: () => void;
  aoDiminuir: () => void;
};

export function Contador({ quantidade, aoAumentar, aoDiminuir }: Props) {
  return (
    <View style={s.linha}>
      <TouchableOpacity
        style={[s.bola, { backgroundColor: paleta.bordaCampo }]}
        onPress={aoDiminuir}
      >
        <Text style={s.sinal}>-</Text>
      </TouchableOpacity>
      <Text style={s.numero}>{quantidade}</Text>
      <TouchableOpacity
        style={[s.bola, { backgroundColor: paleta.vermelho }]}
        onPress={aoAumentar}
      >
        <Text style={s.sinal}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  linha: { flexDirection: "row", alignItems: "center", gap: 8 },
  bola: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sinal: { fontSize: 15, fontWeight: "bold" },
  numero: {
    fontSize: 12,
    fontWeight: "bold",
    minWidth: 12,
    textAlign: "center",
  },
});
