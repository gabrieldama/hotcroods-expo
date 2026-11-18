import { paleta } from "@/constants/paleta";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: paleta.azul,
          height: 80,
          paddingTop: 16,
        },
        tabBarActiveTintColor: paleta.vermelho,
        tabBarInactiveTintColor: paleta.branco,
        tabBarIcon: () => null,
        tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
      }}
    >
      <Tabs.Screen name="inicio" options={{ title: "Início" }} />
      <Tabs.Screen name="pedidos" options={{ title: "Pedidos" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
