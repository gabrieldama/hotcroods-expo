import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { paleta } from '@/constants/paleta';

// TextInputProps = aceita tudo que um TextInput aceita (value, onChangeText, placeholder...)
type Props = TextInputProps & { rotulo?: string };

// Campo de texto com título em cima
export function Campo({ rotulo, ...props }: Props) {
  return (
    <View style={s.grupo}>
      {rotulo && <Text style={s.rotulo}>{rotulo}</Text>}
      <TextInput style={s.input} placeholderTextColor={paleta.bordaCampo} {...props} />
    </View>
  );
}

const s = StyleSheet.create({
  grupo: { marginBottom: 20 },
  rotulo: { fontSize: 13, fontWeight: 'bold', marginBottom: 6, marginLeft: 6 },
  input: {
    height: 46,
    backgroundColor: paleta.branco,
    borderWidth: 1,
    borderColor: paleta.bordaCampo,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
});
