import { Botao } from "@/components/Botao";
import { Campo } from "@/components/Campo";
import { estilosAuth as s } from "@/components/estilosAuth";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text } from "react-native";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (!cpf || !senha) {
      Alert.alert("Atenção", "Preencha CPF e senha.");
      return;
    }
    router.replace("/inicio");
  }

  return (
    <ScrollView contentContainerStyle={s.tela}>
      <Image source={require("../../assets/images/logo.png")} style={s.logo} />
      <Text style={s.titulo}>Bem-vindo{"\n"}de volta!</Text>

      <Campo
        rotulo="CPF"
        placeholder="Digite seu CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <Campo
        rotulo="Senha"
        placeholder="Digite sua Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Link href="/esqueci-senha" style={s.esqueci}>
        Esqueci minha senha
      </Link>

      <Botao texto="Entrar" onPress={entrar} />

      <Text style={s.rodape}>
        Não tem conta?{" "}
        <Link href="/cadastro" style={s.link}>
          Crie uma aqui!
        </Link>
      </Text>
    </ScrollView>
  );
}
