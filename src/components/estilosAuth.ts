import { paleta } from "@/constants/paleta";
import { StyleSheet } from "react-native";

export const estilosAuth = StyleSheet.create({
  tela: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 39,
    backgroundColor: paleta.fundo,
  },
  logo: { width: 157, height: 154, alignSelf: "center" },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: paleta.escuro,
    textAlign: "center",
    marginVertical: 20,
  },
  rodape: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: { color: paleta.vermelho, fontWeight: "900" },
  esqueci: {
    color: paleta.vermelho,
    fontSize: 12,
    textAlign: "right",
    marginTop: -14,
    marginBottom: 20,
  },
});
