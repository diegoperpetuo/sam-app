import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Configurações para os comandos
const config = {
  ip: '192.168.1.61',          // IP do Rockwell
  ip_siemens: '192.168.1.24', // IP do Siemens
  data_type: 'BOOL',            // Tipo de dado (BOOL, INT, REAL, STRING)
  startValue: 1,                // Valor para o comando de Start
  stopValue: 0                  // Valor para o comando de Stop
};

// Função para enviar o comando de Start
const ativarEsteira = async () => {
  try {
      const response = await fetch(`https://localhost:8000/plc/rockwell/write?ip=${config.ip}&data_type=${config.data_type}&value=${config.startValue}`, {
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
          console.log('Resposta:', responseText);   // Resposta do erro
      }
  } catch (error) {
      console.error('Erro:', error);
  }
};

const desativarEsteira = async () => {
  try {
      const response = await fetch(`https://localhost:8000/plc/rockwell/write?ip=${config.ip}&data_type=${config.data_type}&value=${config.startValue}`, {
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

const StatusEst = async (): Promise<boolean | null> => {
  try {
    const response = await fetch(
      `https://localhost:8000/plc/siemens/read?ip=${config.ip_siemens}&data_type=${config.data_type}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          db_number: 29,
          offset: 6,
          bit_offset: 1,
        }),
      }
    );

    const data = await response.json();
    console.log('Resposta da API:', data); // Adicionado para debug
    return data.status;
  } catch (error) {
    console.error('Erro ao acessar API:', error);
    return null;
  }
};

const OperacaoScreen = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [statusEsteira, setStatusEsteira] = useState<boolean | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await StatusEst();
      setStatusEsteira(status);
    }, 2000); // Atualiza o status a cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Operação</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.indicatorContainer}>
          <Text style={styles.indicatorLabel}>Status da Esteira:</Text>
            <Text
              style={[
                styles.indicatorValue,
                statusEsteira === true ? styles.statusOn : styles.statusOff,
              ]}
            >
              {statusEsteira === null
                ? 'Erro ao carregar status'
                : statusEsteira
                ? 'Esteira On'
                : 'Esteira Off'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonAtivo} onPress={ativarEsteira}>
            <Text style={styles.buttonText}>Ativar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonInativo} onPress={desativarEsteira}>
            <Text style={styles.buttonText}>Desativar</Text>
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
  indicatorContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  indicatorLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  indicatorValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statusOn: {
    color: '#34C759',
  },
  statusOff: {
    color: '#FF3B3F',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
