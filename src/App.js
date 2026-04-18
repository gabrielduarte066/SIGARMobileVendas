import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// TODO: Crie a pasta src/ e adicione os arquivos que você importava antes
// import Routes from './src/navigation';
// import { createTables } from './src/database/migrations';

export default function App() {
  useEffect(() => {
    // createTables(); // descomente quando criar o arquivo
    console.log('✅ SIGAR Mobile Vendas iniciado!');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGAR Mobile Vendas</Text>
      <Text style={styles.subtitle}>Força de Vendas Mobile</Text>
      <Text style={styles.info}>App iniciado com sucesso!</Text>
      <Text style={styles.info}>Crie a pasta src/ para continuar o desenvolvimento.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30,
  },
  info: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});