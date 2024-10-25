import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, NavigationProp  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

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


  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleFuracaoPress} style={styles.button}>
            <Text style={styles.buttonText}>Furação</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLimpezaPress} style={styles.button}>
            <Text style={styles.buttonText}>Limpeza</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.selectedOptionText}>{opcaoSelecionada}</Text>

        <View style={styles.centeredView}>

        <Modal 
        visible={modalVisible} 
        transparent={true}
        animationType='slide'
        onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text>Selecione uma opção:</Text>
            <TouchableOpacity onPress={() => handleOpcaoPress('3s')}>  
              <Text>3s</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOpcaoPress('5s')}>
              <Text>5s</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
        visible={modalVisible2}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setModalVisible2(false)}
        >
        <View style={styles.modalView}>
            <Text>Selecione uma opção:</Text>
            <TouchableOpacity onPress={() => handleOpcaoPress('Parcial')}>  
              <Text>Parcial</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOpcaoPress('Completa')}>
              <Text>Completa</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Inspeção</Text>
          </TouchableOpacity>
        </View>        

      </View>
      <View >
        <TextInput style={styles.input} placeholder="Quantidade" >
        </TextInput>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
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
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
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