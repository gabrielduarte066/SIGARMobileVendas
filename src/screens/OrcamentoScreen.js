import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import db from "../database";

export default function OrcamentoScreen({ route }) {
  const { cliente } = route.params;

  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM PRODUTOS`, [], (_, { rows }) => {
        setProdutos(rows._array);
      });
    });
  }, []);

  const addCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  return (
    <View style={{ padding: 10 }}>
      <Text>Cliente: {cliente.CLIENTE}</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.CODPROD.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addCarrinho(item)}>
            <Text>
              {item.DESCRICAO} - R$ {item.PVENDA}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text>Itens no carrinho: {carrinho.length}</Text>
    </View>
  );
}
