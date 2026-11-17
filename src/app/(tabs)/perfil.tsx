import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Botao } from '@/components/Botao';
import { Campo } from '@/components/Campo';
import { paleta } from '@/constants/paleta';

export default function Perfil() {
  const [nome, setNome] = useState('Gabriel');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  function salvar() {
    // Depois: enviar para a API (PUT /usuario/{id})
    Alert.alert('Perfil', 'Dados salvos!');
  }

  return (
    <ScrollView contentContainerStyle={s.tela}>
      <View style={s.avatar}>
        <Text style={s.inicial}>{nome ? nome[0].toUpperCase() : '?'}</Text>
      </View>
      <Text style={s.titulo}>Perfil</Text>

      <Campo placeholder="Digite seu Nome" value={nome} onChangeText={setNome} />
      <Campo placeholder="Digite seu E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Campo placeholder="Digite seu CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
      <Campo placeholder="Digite sua Senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <View style={s.acoes}>
        <Botao escuro texto="Confirmar" onPress={salvar} style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={s.sair}>Voltar</Text>
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicial: { fontSize: 60, fontWeight: 'bold', color: paleta.escuro },
  titulo: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  acoes: { flexDirection: 'row', alignItems: 'center', gap: 30, marginTop: 10 },
  sair: { color: paleta.escuro, fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' },
});
