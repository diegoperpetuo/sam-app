import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TextInput, TouchableOpacity, Image, Alert, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, NavigationProp  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const config_pedido = {
  ip: '192.168.1.24',          // IP do Siemens
  data_type: 'INT',            // Tipo de dado (BOOL, INT, REAL, STRING)
  Value: 0,                // Valor para o comando
  furacao3s: 2,
  limp_parcial: 4,
  inspecao: 8,
  limp_completa: 16,
  furacao5s: 32
};

const Pedido = async (operationValue: number) => {
  try {
      const response = await fetch('http://localhost:8000/plc/siemens/write?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}&value=${config_pedido.Value}', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                  "db_number": 29,
                  "offset": 4,
                  "bit_offset": 0
          }),
      });

      // Verifica se a resposta é bem-sucedida
      if (response.ok) {
          console.log('Pedido enviado com sucesso!');
      } else {
          // Exibe o status e a resposta do servidor para ajudar na depuração
          console.log('Erro ao enviar o pedido');
          console.log('Status:', response.status);  // Código de status HTTP
          const responseText = await response.text();
          console.log('Resposta:', responseText);   // Corpo da resposta do erro
      }
  } catch (error) {
      console.error('Erro:', error);
  }
};


const PedidoScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);
  const [opcaoSelecionada2, setOpcaoSelecionada2] = useState<string | null>(null);
  
  const handleFuracaoPress = () => {
    setModalVisible(true);
  };

  const handleLimpezaPress = () => {
    setModalVisible2(true);
  };

  const handleOpcaoPress = (opcao: string) => {
    setOpcaoSelecionada(opcao);
    setOpcaoSelecionada2(opcao);
    setModalVisible(false);
    setModalVisible2(false);
  };

  const [selecionado, setSelecionado] = useState(false);

  const handlePress = () => {
    setSelecionado(!selecionado);
  };

    // Estado para armazenar as operações selecionadas
    const [selectedOperations, setSelectedOperations] = useState<any[]>([]);

    // Função para alternar a seleção de uma operação
    const toggleOperation = (operationValue: any) => {
      setSelectedOperations((prevOperations) => {
        if (prevOperations.includes(operationValue)) {
          // Remove a operação se já estiver selecionada
          return prevOperations.filter((value) => value !== operationValue);
        } else {
          // Adiciona a operação se ainda não estiver selecionada
          return [...prevOperations, operationValue];
        }
      });
    };
  
    // Calcula o valor total das operações selecionadas
    const calculateTotalValue = () => {
      return selectedOperations.reduce((total, value) => total + value, 0);
    };
  
  
  
  return (


    <View style={styles.container}>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleOperation(config_pedido.furacao3s)} style={[styles.button, opcaoSelecionada === '3s' ? styles.selecionado : {}]}>
            <Text style={styles.buttonText}>Furação 3s</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleOperation(config_pedido.furacao5s)} style={[styles.button, opcaoSelecionada === '5s' ? styles.selecionado : {}]}>
            <Text style={styles.buttonText}>Furação 5s</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.selectedOptionText}>{opcaoSelecionada}</Text>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleOperation(config_pedido.limp_parcial)} style={[styles.button, opcaoSelecionada === 'Parcial' ? styles.selecionado : {}]}>
            <Text style={styles.buttonText}>Limpeza Parcial</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleOperation(config_pedido.limp_completa)} style={[styles.button, opcaoSelecionada === 'Completa' ? styles.selecionado : {}]}>
            <Text style={styles.buttonText}>Limpeza Completa</Text>
          </TouchableOpacity>
        </View>
      </View>
            <View >
                  <TouchableOpacity onPress={() => toggleOperation(config_pedido.inspecao)} style={[styles.button, opcaoSelecionada === 'Completa' ? styles.selecionado : {}]}>
                    <Text style={styles.buttonText}>Inspeção</Text>
                </TouchableOpacity>
                <Button
                  title="Enviar Comando"
                  onPress={() => Pedido(calculateTotalValue())}
                />    
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
  iconContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
    marginRight: 120,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '70%',
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selecionado: {
    backgroundColor: '#4CAF50'
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 80,
    width: 110,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    textAlign: 'left',
  },
});

export default PedidoScreen;