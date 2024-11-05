import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // lógica de login aqui
    if (user === 'sa' && password === 'Cimatec123') {
      console.log('Usuário:', user);
      console.log('Senha:', password);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
      <FontAwesome name="user-circle-o" size={60} color="black" />
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 100,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
});

export default LoginScreen;