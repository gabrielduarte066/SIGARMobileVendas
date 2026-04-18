import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@sigar_user";

export const saveUser = async (usuario, senha) => {
  try {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({ usuario, senha })
    );
  } catch (e) {
    console.log("Erro ao salvar usuário", e);
  }
};

export const getUser = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.log("Erro ao buscar usuário", e);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem("@sigar_user");
  } catch (e) {
    console.log("Erro ao limpar usuário", e);
  }
};