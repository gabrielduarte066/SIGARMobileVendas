import { useState, useEffect } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import db from "../database";
import { syncUsuarios } from "../services/syncService";
import { saveUser, getUser } from "../storage/authStorage";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);

  const { setUser } = useAuth();

  // 🔄 AUTO LOAD (preenche e pode auto logar)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUser();

        if (user) {
          setUsuario(user.usuario);
          setSenha(user.senha);

          // 🔥 AUTO LOGIN (opcional - pode comentar se quiser)
          const result = db.getAllSync(
            `SELECT * FROM USUARIOS 
             WHERE USUARIOBD = ? AND SENHA = ?`,
            [
              user.usuario.trim().toUpperCase(),
              user.senha.trim().toUpperCase(),
            ]
          );

          if (result.length > 0) {
            setUser(result[0]);
            navigation.replace("Home");
            return;
          }
        }
      } catch (e) {
        console.log("Erro ao carregar usuário:", e);
      } finally {
        setCheckingUser(false);
      }
    };

    loadUser();
  }, []);

  // 🔐 LOGIN
  const handleLogin = async () => {
    if (!usuario || !senha) {
      Alert.alert("Atenção", "Informe usuário e senha");
      return;
    }

    try {
      const result = db.getAllSync(
        `SELECT * FROM USUARIOS 
         WHERE USUARIOBD = ? AND SENHA = ?`,
        [
          usuario.trim().toUpperCase(),
          senha.trim().toUpperCase(),
        ]
      );

      console.log("RESULT LOGIN:", result);

      if (result.length > 0) {
        const userLogado = result[0];

        setUser(userLogado);
        await saveUser(usuario, senha);

        navigation.replace("Home");
      } else {
        Alert.alert("Erro", "Usuário ou senha inválidos");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao fazer login");
    }
  };

  // 🔄 SINCRONIZAÇÃO
  const handleSync = async () => {
    try {
      setLoading(true);

      await syncUsuarios();

      Alert.alert("Sucesso", "Usuários sincronizados");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha ao sincronizar");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 LOADING INICIAL
  if (checkingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Input
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Input
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Entrar" onPress={handleLogin} />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Sincronizar Usuários" onPress={handleSync} />
      )}
    </View>
  );
}