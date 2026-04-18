import { View, Text } from "react-native";

export default function ClienteDetalheScreen({ route }) {
  const { cliente } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome: {cliente.CLIENTE}</Text>
      <Text>Fantasia: {cliente.FANTASIA}</Text>
    </View>
  );
}