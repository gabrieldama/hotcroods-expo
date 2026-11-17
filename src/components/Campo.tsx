import { paleta } from "@/constants/paleta";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type Props = {
  texto: string;
  onPress: () => void;
  escuro?: boolean;
  style?: ViewStyle;
};

export function Botao({ texto, onPress, escuro, style }: Props) {
  return (
    <TouchableOpacity
      style={[
        s.botao,
        { backgroundColor: escuro ? paleta.escuro : paleta.vermelho },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={s.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  botao: { borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  texto: { color: paleta.branco, fontSize: 16, fontWeight: "bold" },
});
