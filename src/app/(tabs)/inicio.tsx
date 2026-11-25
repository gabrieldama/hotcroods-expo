import { Contador } from "@/components/Contador";
import { paleta } from "@/constants/paleta";
import { aumentar, diminuir, itensDoCarrinho, quantidade } from "@/data/carrinho";
import { formatarPreco, listarProdutos, Produto } from "@/services/api";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIAS = ["Todos", "Salgados", "Bebidas", "Doces"];

export default function Inicio() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [, setAtualizar] = useState(0);

  const redesenhar = () => setAtualizar((n) => n + 1);
  useFocusEffect(useCallback(() => redesenhar(), []));

  // Busca na API sempre que a categoria mudar
  useEffect(() => {
    setCarregando(true);
    setErro(false);
    listarProdutos(categoria)
      .then(setProdutos)
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, [categoria]);

  // A busca por texto é feita aqui mesmo, na lista que já veio
  const lista = produtos.filter(
    (p) => p.disponivel && p.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <View style={s.tela}>
      <View style={s.marca}>
        <Image source={require("../../../assets/images/logo.png")} style={s.logo} />
        <Text style={s.nomeApp}>CANTINA CRUD'S</Text>
      </View>

      <TextInput style={s.busca} placeholder="Buscar" value={busca} onChangeText={setBusca} />

      <View style={s.chips}>
        {CATEGORIAS.map((c) => (
          <TouchableOpacity
            key={c}
            style={[s.chip, categoria === c && s.chipAtivo]}
            onPress={() => setCategoria(c)}
          >
            <Text style={[s.chipTexto, categoria === c && { color: paleta.branco }]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.caixa}>
        {carregando ? (
          <ActivityIndicator size="large" color={paleta.vermelho} style={{ marginTop: 40 }} />
        ) : erro ? (
          <Text style={s.vazio}>Não foi possível carregar. Verifique a internet.</Text>
        ) : (
          <FlatList
            data={lista}
            keyExtractor={(p) => String(p.id)}
            ListEmptyComponent={<Text style={s.vazio}>Nenhum produto encontrado.</Text>}
            renderItem={({ item }) => (
              <View style={s.item}>
                <Image source={{ uri: item.url }} style={s.foto} />
                <Text style={s.nome}>{item.nome}</Text>
                <Text style={s.preco}>{formatarPreco(item.valor)}</Text>
                <Contador
                  quantidade={quantidade(item.id)}
                  aoAumentar={() => {
                    aumentar(item);
                    redesenhar();
                  }}
                  aoDiminuir={() => {
                    diminuir(item);
                    redesenhar();
                  }}
                />
              </View>
            )}
          />
        )}
      </View>

      <TouchableOpacity style={s.carrinho} onPress={() => router.push("/carrinho")}>
        <Text style={s.carrinhoTexto}>CARRINHO ({itensDoCarrinho().length})</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo, padding: 20, paddingTop: 50 },
  marca: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
  logo: { width: 40, height: 40 },
  nomeApp: { fontSize: 18, fontWeight: "bold", color: paleta.escuro },
  busca: { height: 48, backgroundColor: paleta.branco, borderRadius: 14, paddingHorizontal: 20 },
  chips: { flexDirection: "row", gap: 8, marginVertical: 14 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: paleta.borda,
    backgroundColor: paleta.branco,
  },
  chipAtivo: { backgroundColor: paleta.escuro },
  chipTexto: { fontSize: 13, fontWeight: "600" },
  caixa: { flex: 1, backgroundColor: paleta.branco, borderRadius: 14, padding: 12 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 9 },
  foto: { width: 34, height: 26, borderRadius: 2, backgroundColor: paleta.vermelho, marginRight: 10 },
  nome: { flex: 1, fontSize: 14, fontWeight: "600" },
  preco: { fontSize: 11, color: paleta.textoPreco, marginRight: 8 },
  vazio: { textAlign: "center", color: paleta.cinza, marginTop: 20 },
  carrinho: {
    height: 64,
    borderRadius: 14,
    backgroundColor: paleta.escuro,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  carrinhoTexto: { fontSize: 18, fontWeight: "bold", color: paleta.branco },
});