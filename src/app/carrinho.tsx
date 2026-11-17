import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Botao } from '@/components/Botao';
import { Cabecalho } from '@/components/Cabecalho';
import { Contador } from '@/components/Contador';
import { paleta } from '@/constants/paleta';
import { aumentar, diminuir, itensDoCarrinho } from '@/data/carrinho';
import { formatarPreco } from '@/data/produtos';

export default function Carrinho() {
  const [, setAtualizar] = useState(0);
  const redesenhar = () => setAtualizar((n) => n + 1);

  const itens = itensDoCarrinho();

  return (
    <View style={s.tela}>
      <Cabecalho titulo="Carrinho" />
      <Text style={s.subtitulo}>Seu pedido ({itens.length})</Text>

      <FlatList
        data={itens}
        keyExtractor={(i) => String(i.produto.id)}
        ListEmptyComponent={<Text style={s.vazio}>Seu carrinho está vazio.</Text>}
        renderItem={({ item }) => (
          <View style={s.item}>
            <View style={s.foto} />
            <View>
              <Text style={s.nome}>{item.produto.nome}</Text>
              <View style={s.linha}>
                <Contador
                  quantidade={item.quantidade}
                  aoAumentar={() => { aumentar(item.produto.id); redesenhar(); }}
                  aoDiminuir={() => { diminuir(item.produto.id); redesenhar(); }}
                />
                <Text style={s.preco}>{formatarPreco(item.produto.valor * item.quantidade)}</Text>
              </View>
            </View>
          </View>
        )}
      />

      {itens.length > 0 && <Botao escuro texto="Confirmar" onPress={() => router.push('/checkout')} />}
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo, padding: 25, paddingTop: 50 },
  subtitulo: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
  item: { flexDirection: 'row', gap: 20, marginBottom: 30 },
  foto: { width: 87, height: 67, borderRadius: 2, backgroundColor: paleta.vermelho },
  nome: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  preco: { fontSize: 11, color: paleta.textoPreco },
  vazio: { textAlign: 'center', color: paleta.cinza, marginTop: 20 },
});
