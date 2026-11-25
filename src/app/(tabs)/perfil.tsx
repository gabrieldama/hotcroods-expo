import { Botao } from "@/components/Botao";
import { Campo } from "@/components/Campo";
import { paleta } from "@/constants/paleta";
import { pegarUsuario, salvarUsuario } from "@/data/sessao";
import { atualizarUsuario } from "@/services/api";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
  const usuario = pegarUsuario();
  // Começa com os dados que vieram do login
  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [cpf, setCpf] = useState(""); // a API não devolve o CPF
  const [senha, setSenha] = useState(""); // nem a senha

  async function salvar() {
    if (!usuario) return;
    if (!nome || !email || !cpf || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos (a API exige CPF e senha).");
      return;
    }
    try {
      const atualizado = await atualizarUsuario(usuario.id, nome, cpf, email, senha); // PUT /usuario/{id}
      salvarUsuario({ ...usuario, ...atualizado });
      Alert.alert("Perfil", "Dados salvos!");
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  }

  function sair() {
    salvarUsuario(null);
    router.replace("/login");
  }

  return (
    <ScrollView contentContainerStyle={s.tela}>
      <View style={s.avatar}>
        <Text style={s.inicial}>{nome ? nome[0].toUpperCase() : "?"}</Text>
      </View>
      <Text style={s.titulo}>Perfil</Text>

      <Campo placeholder="Digite seu Nome" value={nome} onChangeText={setNome} />
      <Campo
        placeholder="Digite seu E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Campo placeholder="Digite seu CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
      <Campo placeholder="Digite sua Senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <View style={s.acoes}>
        <Botao escuro texto="Confirmar" onPress={salvar} style={{ flex: 1 }} />
        <TouchableOpacity onPress={sair}>
          <Text style={s.sair}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flexGrow: 1, backgroundColor: paleta.fundo, padding: 20, paddingTop: 70 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: paleta.vermelho,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  inicial: { fontSize: 60, fontWeight: "bold", color: paleta.escuro },
  titulo: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginVertical: 16 },
  acoes: { flexDirection: "row", alignItems: "center", gap: 30, marginTop: 10 },
  sair: { color: paleta.escuro, fontSize: 16, fontWeight: "bold", textDecorationLine: "underline" },
});