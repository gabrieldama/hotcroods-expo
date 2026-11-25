import { Botao } from "@/components/Botao";
import { Campo } from "@/components/Campo";
import { estilosAuth as s } from "@/components/estilosAuth";
import { salvarUsuario } from "@/data/sessao";
import { login } from "@/services/api";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }
    try {
      const usuario = await login(email, senha); // POST /usuario/login
      salvarUsuario(usuario);                     // guarda quem entrou
      router.replace("/inicio");
    } catch (erro) {
      Alert.alert("Erro", String((erro as Error).message));
    }
  }

  return (
    <ScrollView contentContainerStyle={s.tela}>
      <Image source={require("../../assets/images/logo.png")} style={s.logo} />
      <Text style={s.titulo}>Bem-vindo{"\n"}de volta!</Text>

      <Campo
        rotulo="E-mail"
        placeholder="Digite seu E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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