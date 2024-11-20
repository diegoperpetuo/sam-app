import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// Configurações para os comandos
const config = {
  ip: '192.168.1.61',          // IP do Rockwell
  data_type: 'BOOL',            // Tipo de dado (BOOL, INT, REAL, STRING)
  startValue: 1,                // Valor para o comando de Start
  stopValue: 0                  // Valor para o comando de Stop
};

// Função para enviar o comando de Start
const ativarEsteira = async () => {
  try {
      const response = await fetch(`http://localhost:8000/plc/rockwell/write?ip=${config.ip}&data_type=${config.data_type}&value=${config.startValue}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "name": "Power_Flex_ESTEIRA:O.Start"
          }),
      });

      // Verifica se a resposta é bem-sucedida
      if (response.ok) {
          console.log('Comando de Start enviado com sucesso!');
      } else {
          // Exibe o status e a resposta do servidor para ajudar na depuração
          console.log('Erro ao enviar o comando de Start');
          console.log('Status:', response.status);  // Código de status HTTP
          const responseText = await response.text();
          console.log('Resposta:', responseText);   // Corpo da resposta do erro
      }
  } catch (error) {
      console.error('Erro:', error);
  }
};

const desativarEsteira = async () => {
  try {
      const response = await fetch(`http://localhost:8000/plc/rockwell/write?ip=${config.ip}&data_type=${config.data_type}&value=${config.startValue}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "name": "Power_Flex_ESTEIRA:O.Stop"
          }),
      });

      // Verifica se a resposta é bem-sucedida
      if (response.ok) {
          console.log('Comando de Stop enviado com sucesso!');
      } else {
          // Exibe o status e a resposta do servidor para ajudar na depuração
          console.log('Erro ao enviar o comando de Stop');
          console.log('Status:', response.status);  // Código de status HTTP
          const responseText = await response.text();
          console.log('Resposta:', responseText);   // Corpo da resposta do erro
      }
  } catch (error) {
      console.error('Erro:', error);
  }
};


const OperacaoScreen = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [frequencia, setFrequencia] = useState('40 Hz'); // valor inicial da frequência

  const [ativo, setAtivo] = useState(false);

  const estaçõesAtivas = [
    { nome: 'Estação de Entrada', ativa: true },
    { nome: 'Inspeção', ativa: false },
    { nome: 'Limpeza', ativa: true },
    { nome: 'Saída', ativa: false },
  ];



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Operação</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.buttonAtivo}
          onPress={ativarEsteira}
          >
            <Text style={styles.buttonText}>Ligar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonInativo}
          onPress={desativarEsteira}
          >
            <Text style={styles.buttonText}>Desligar</Text>
          </TouchableOpacity>

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
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 32,
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
  buttonAtivo: {
    backgroundColor: '#34C759',
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 32,
  },
  buttonInativo: {
    backgroundColor: '#FF3B3F',
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 32,
  },
});

export default OperacaoScreen;