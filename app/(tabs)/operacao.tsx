import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OperacaoScreen = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [frequencia, setFrequencia] = useState('10 Hz'); // valor inicial da frequência


  const estaçõesAtivas = [
    { nome: 'Estação de Entrada', ativa: true },
    { nome: 'Inspeção', ativa: false },
    { nome: 'Limpeza', ativa: true },
    { nome: 'Saída', ativa: false },
  ];

  
  // Função para fazer a chamada de ativação
  const ativarEsteira = async () => {
      try {
          // Substitua pelo IP correto do PLC e informações da tag apropriada
          const response = await fetch('http://localhost:8000/plc/siemens/write', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ip: '192.168.1.10', // IP do seu PLC Siemens ou Rockwell
                  data_type: 'BOOL', // Tipo de dado para ativação (provavelmente um booleano)
                  tag: {
                      db_number: 1, // Exemplo de DB para Siemens, configure conforme seu PLC
                      offset: 0, // Offset da tag específica
                      bit_offset: 0 // Bit se necessário
                  },
                  value: 1 // Valor que ativa a planta (1 para ligar, 0 para desligar)
              }),
          });
  
          if (response.ok) {
              Alert.alert('Planta ativada com sucesso!');
          } else {
              Alert.alert('Erro ao ativar a planta');
          }
      } catch (error) {
          console.error(error);
      }
  };

  const desativarEsteira = async () => {
      try {
          // Substitua pelo IP correto do PLC e informações da tag apropriada
          const response = await fetch('http://localhost:8000/plc/siemens/write', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ip: '192.168.1.10', // IP do seu PLC Siemens ou Rockwell
                  data_type: 'BOOL', // Tipo de dado para desativação (provavelmente um booleano)
                  tag: {
                      db_number: 1, // Exemplo de DB para Siemens, configure conforme seu PLC
                      offset: 0, // Offset da tag fkkica
                      bit_offset: 0 // Bit seácil
                  },
                  value: 0 // Valor que desativa a planta (1 para ligar, 0 para desligar)
              }),
          });
  
          if (response.ok) {
              Alert.alert('Planta desativada com sucesso!');
          } else {
              Alert.alert('Erro ao desativar a planta');
          }
      } catch (error) {
          console.error(error);
      }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Operação</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>

          <TouchableOpacity onPress={ativarEsteira} style={styles.button}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#fff" />
            <Text style={styles.buttonText}>Ativar Esteira</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={desativarEsteira} style={styles.button}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#fff" />
            <Text style={styles.buttonText}>Desativar Esteira</Text>
          </TouchableOpacity>

          <View style={styles.frequenciaContainer}>
            <Text style={styles.frequenciaLabel}>Frequência da Esteira:</Text>
            <Text style={styles.frequenciaValue}>{frequencia}</Text>
          </View>
        </View>
        <View style={styles.ledsContainer}>
          {estaçõesAtivas.map((estacao, index) => (
            <View key={index} style={styles.ledContainer}>
              <View style={[styles.led, estacao.ativa ? styles.ledAtiva : styles.ledInativa]} />
              <Text style={styles.ledText}>{estacao.nome}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  frequenciaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  frequenciaLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  frequenciaValue: {
    fontSize: 16,
    color: '#333',
  },
  ledsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  ledContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  led: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 10,
  },
  ledAtiva: {
    backgroundColor: '#34C759',
  },
  ledInativa: {
    backgroundColor: '#FF3B3F',
  },
  ledText: {
    fontSize: 24,
    color: '#333',
  },
});

export default OperacaoScreen;