import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#16355D" },
        tabBarActiveTintColor: "#DF383B",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarIcon: () => null,
      }}
    >
      <Tabs.Screen name="inicio" options={{ title: "Início" }} />
      <Tabs.Screen name="pedidos" options={{ title: "Pedidos" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
