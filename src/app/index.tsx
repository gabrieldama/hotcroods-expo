import { Botao } from "@/components/Botao";
import { paleta } from "@/constants/paleta";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function BoasVindas() {
  return (
    <View style={s.tela}>
      <View style={s.centro}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={s.logo}
        />
      </View>
      <Botao texto="Entrar" onPress={() => router.push("/login")} />
    </View>
  );
}

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: paleta.fundo,
    padding: 20,
    paddingBottom: 40,
  },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: 300, height: 295 },
});
