import { View, Text } from "react-native";
import Button from "../components/Button";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        SIGAR Mobile Vendas
      </Text>

      <Button
        title="Clientes"
        onPress={() => navigation.navigate("Clientes")}
      />

      <Button
        title="Orçamentos"
        onPress={() => navigation.navigate("Orcamentos")}
      />

      <Button
        title="Sincronizar Dados"
        onPress={() => navigation.navigate("Sincronizar")}
      />
    </View>
  );
}