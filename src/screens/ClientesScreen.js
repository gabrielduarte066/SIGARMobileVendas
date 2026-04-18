import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import db from "../database";

export default function ClientesScreen({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");

  const loadClientes = () => {
    try {
      const result = db.getAllSync(
        `SELECT * FROM CLIENTES WHERE CLIENTE LIKE ?`,
        [`%${busca}%`]
      );

      setClientes(result);
    } catch (error) {
      console.log("Erro ao carregar clientes:", error);
    }
  };

  useEffect(() => {
    loadClientes();
  }, [busca]);

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        placeholder="Buscar cliente..."
        value={busca}
        onChangeText={setBusca}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.CODCLI?.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Orcamento", { cliente: item })
            }
          >
            <Text>{item.CLIENTE}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}