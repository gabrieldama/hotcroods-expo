import { StyleSheet, Text, View } from 'react-native';
import { paleta } from '@/constants/paleta';

// Etiqueta verde (Finalizado) ou amarela (Em andamento)
export function StatusChip({ status }: { status: string }) {
  const cor = status === 'Finalizado' ? paleta.verde : paleta.amarelo;
  return (
    <View style={[s.chip, { backgroundColor: cor }]}>
      <Text style={s.texto}>{status}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  chip: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: 999 },
  texto: { fontSize: 13, fontWeight: '600' },
});
