import { Botao } from "@/components/Botao";
import { Campo } from "@/components/Campo";
import { estilosAuth as s } from "@/components/estilosAuth";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text } from "react-native";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  function salvar() {
    Alert.alert("Pronto!", "Senha alterada.");
    router.back();
  }

  return (
    <ScrollView contentContainerStyle={s.tela}>
      <Image source={require("../../assets/images/logo.png")} style={s.logo} />
      <Text style={s.titulo}>Esqueceu{"\n"}Senha</Text>

      <Campo
        rotulo="Email"
        placeholder="Digite seu E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Campo
        rotulo="Nova Senha"
        placeholder="Digite sua nova Senha"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
      />

      <Botao texto="Salvar" onPress={salvar} />

      <Text style={s.rodape}>
        Não tem conta?{" "}
        <Link href="/cadastro" style={s.link}>
          Crie uma aqui!
        </Link>
      </Text>
    </ScrollView>
  );
}
