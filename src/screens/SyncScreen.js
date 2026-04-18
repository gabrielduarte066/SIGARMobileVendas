import { View, Text, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import Button from "../components/Button";
import { syncUsuarios, syncClientes } from "../services/syncService";
import { clearUser } from "../storage/authStorage";
import { useAuth } from "../context/AuthContext";

export default function SyncScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  let user = null;

  // 🔥 proteção contra erro de contexto
  try {
    const auth = useAuth();
    user = auth.user;
  } catch (e) {
    console.log("ERRO CONTEXTO:", e);
  }

  const handleLogout = async () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        onPress: async () => {
          await clearUser();

          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  const handleSyncAll = async () => {
    try {
      if (!user) {
        Alert.alert("Erro", "Usuário não carregado");
        return;
      }

      setLoading(true);

      await syncUsuarios();
      await syncClientes(user); // 🔥 usa CODUSUR / CODFILIAL

      Alert.alert("Sucesso", "Dados sincronizados");
    } catch (e) {
      console.log("ERRO SYNC:", e);
      Alert.alert("Erro", "Falha na sincronização");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 16 }}>
        Sincronização de Dados
      </Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={{ gap: 10 }}>
          <Button title="Sincronizar Tudo" onPress={handleSyncAll} />
          <Button title="Sair do sistema" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
}