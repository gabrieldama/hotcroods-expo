import { Tabs } from 'expo-router';
import { paleta } from '@/constants/paleta';

// Barra de baixo azul: cada <Tabs.Screen> é um arquivo dentro de (tabs)/
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: paleta.azul, height: 80, paddingTop: 16 },
        tabBarActiveTintColor: paleta.vermelho, // aba aberta = vermelho
        tabBarInactiveTintColor: paleta.branco, // outras = branco
        tabBarIcon: () => null,                 // no Figma não tem ícone
        tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen name="inicio" options={{ title: 'Início' }} />
      <Tabs.Screen name="pedidos" options={{ title: 'Pedidos' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
