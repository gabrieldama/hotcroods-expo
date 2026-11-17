import { Botao } from "@/components/Botao";
import { Campo } from "@/components/Campo";
import { estilosAuth as s } from "@/components/estilosAuth";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text } from "react-native";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  function criarConta() {
    if (!nome || !email || !cpf || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }
    Alert.alert("Pronto!", "Conta criada. Agora faça login.");
    router.replace("/login");
  }

  return (
    <ScrollView contentContainerStyle={s.tela}>
      <Image source={require("../../assets/images/logo.png")} style={s.logo} />
      <Text style={s.titulo}>Crie sua conta</Text>

      <Campo
        rotulo="Nome"
        placeholder="Digite seu Nome"
        value={nome}
        onChangeText={setNome}
      />
      <Campo
        placeholder="Digite seu E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Campo
        placeholder="Digite seu CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <Campo
        placeholder="Digite sua Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Botao texto="Criar" onPress={criarConta} />

      <Text style={s.rodape}>
        Já tem conta?{" "}
        <Link href="/login" style={s.link}>
          Clique aqui!
        </Link>
      </Text>
    </ScrollView>
  );
}
