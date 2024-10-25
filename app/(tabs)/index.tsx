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
      <Text style={styles.title}>vddee</Text>
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

// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { NavigationContainer, NavigationProp } from '@react-navigation/native';

// const LoginScreen = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (username === 'sa' && password === 'cimatec123') {
//       // Lógica para autenticar o usuário
//       console.log('Usuário autenticado com sucesso!');
//       navigation.navigate('Home');
//     } else {
//       console.log('Usuário ou senha inválidos!');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Usuário"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Senha"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Entrar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 4,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default LoginScreen;