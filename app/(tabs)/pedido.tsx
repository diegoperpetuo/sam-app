import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const config_pedido = {
  ip: '192.168.1.24',
  data_type: 'INT',
  data_type2: 'BOOL',
  furacao3s: 2,
  limp_parcial: 4,
  inspecao: 8,
  limp_completa: 16,
  furacao5s: 32,
};



const QtdPeca = async (qtdValue: number) => {
  try {
    const response2 = await fetch(`rw-plc-master-production.up.railway.app/plc/siemens/write?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}&value=${qtdValue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "db_number": 29,
        "offset": 130,
        "bit_offset": 0
      }),
    }
    );
  } catch (error) {
    console.error('Erro:', error);
  }
};

// Função para enviar o comando ao Siemens
const Pedido = async (totalValue: number) => {
  try {
    const response1 = await fetch(`rw-plc-master-production.up.railway.app/plc/siemens/write?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}&value=${totalValue}`, {
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

    if (response1.ok) {
      console.log('Pedido enviado com sucesso!');
    } else {
      console.log('Erro ao enviar o pedido');
      console.log('Status:', response1.status);
      const responseText = await response1.text();
      console.log('Resposta:', responseText);
    }

  } catch (error) {
    console.error('Erro:', error);
  }
}

const Pedido2 = async () => {
  const response2 = await fetch(`rw-plc-master-production.up.railway.app/plc/siemens/write?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}&value=0`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "db_number": 29,
      "offset": 0,
      "bit_offset": 0
    }),
  });
}

const Pedido3 = async () => {
  const response3 = await fetch(`rw-plc-master-production.up.railway.app/plc/siemens/write?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}&value=1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "db_number": 29,
      "offset": 0,
      "bit_offset": 0
    }),
  });
};

const Alerta = async (setMessage: (message: string) => void, fadeAnim: Animated.Value) => {
  try {
    const response = await fetch(`rw-plc-master-production.up.railway.app/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        db_number: 29,
        offset: 0,
        bit_offset: 2,
      }),
    });

    const data = await response.json();
    if (data.value === true) {
      setMessage('Pedido enviado com sucesso!');
    } else {
      setMessage('Não foi possível enviar o pedido');
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      fadeAnim.setValue(1);
      setMessage('');
    });
  } catch (error) {
    console.error('Erro:', error);
  }
};


const TipoPeca = async () => {
  const response3 = await fetch(`rw-plc-master-production.up.railway.app/plc/siemens/write?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}&value=2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "db_number": 29,
      "offset": 2,
      "bit_offset": 0
    }),
  });
};

const App = () => {
  const [selectedOperations, setSelectedOperations] = useState<number[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  
  const [qtdValue, setQtdValue] = useState<number>(1); // Iniciar com 1
  
  const fadeAnim = new Animated.Value(1);

  const handleQtdValueChange = (value: number) => {
    setQtdValue(value);
  };
    
  const calculateTotalValue = () => {
    return selectedOperations.reduce((total, value) => total + value, 0);
  };



  
  const showToast = () => {
    setShowConfirmation(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setShowConfirmation(false);
      fadeAnim.setValue(1); // Reseta a opacidade
    });
  };

  const toggleOperation = (operationValue: number) => {
    if (selectedOperations.includes(operationValue)) {
      setSelectedOperations(selectedOperations.filter(value => value !== operationValue));
    } else {
      setSelectedOperations([...selectedOperations, operationValue]);
    }
  };
  
  const handleClearSelections = () => {
    setSelectedOperations([]);
  };
  
  const isSelected = (operationValue: number) => 
    selectedOperations.includes(operationValue);
  
  const isDisabled = (operationValue: number) => {
    if (operationValue === config_pedido.furacao3s) {
      return selectedOperations.includes(config_pedido.furacao5s);
    }
    if (operationValue === config_pedido.furacao5s) {
      return selectedOperations.includes(config_pedido.furacao3s);
    }
    if (operationValue === config_pedido.limp_parcial) {
      return selectedOperations.includes(config_pedido.limp_completa);
    }
    if (operationValue === config_pedido.limp_completa) {
      return selectedOperations.includes(config_pedido.limp_parcial);
    }
    return false;
  };
  
  const handleSendCommand = () => {
    const totalValue = calculateTotalValue();
    Pedido(totalValue);
    setTimeout(() => {
      TipoPeca();
      QtdPeca(qtdValue);
      Pedido3();
      setQtdValue(1);
      Pedido2();
      Alerta(setToastMessage, fadeAnim);
    }, 1000);
    setSelectedOperations([]);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pedidos</Text>
      </View>

      {toastMessage && (
        <Animated.View
          style={[styles.toastContainer, toastMessage === 'Não foi possível enviar o pedido' ? styles.toastError : styles.toastSuccess, { opacity: fadeAnim }]}
        >
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}



      <TouchableOpacity
        style={[
          styles.button,
          isSelected(config_pedido.furacao3s) && styles.selectedButton,
          isDisabled(config_pedido.furacao3s) && styles.disabledButton,
        ]}
        onPress={() => toggleOperation(config_pedido.furacao3s)}
        disabled={isDisabled(config_pedido.furacao3s)}
      >
        <Text style={styles.buttonText}>Furação 3s</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isSelected(config_pedido.furacao5s) && styles.selectedButton,
          isDisabled(config_pedido.furacao5s) && styles.disabledButton,
        ]}
        onPress={() => toggleOperation(config_pedido.furacao5s)}
        disabled={isDisabled(config_pedido.furacao5s)}
      >
        <Text style={styles.buttonText}>Furação 5s</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isSelected(config_pedido.limp_parcial) && styles.selectedButton,
          isDisabled(config_pedido.limp_parcial) && styles.disabledButton,
        ]}
        onPress={() => toggleOperation(config_pedido.limp_parcial)}
        disabled={isDisabled(config_pedido.limp_parcial)}
      >
        <Text style={styles.buttonText}>Limpeza Parcial</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isSelected(config_pedido.limp_completa) && styles.selectedButton,
          isDisabled(config_pedido.limp_completa) && styles.disabledButton,
        ]}
        onPress={() => toggleOperation(config_pedido.limp_completa)}
        disabled={isDisabled(config_pedido.limp_completa)}
      >
        <Text style={styles.buttonText}>Limpeza Completa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isSelected(config_pedido.inspecao) && styles.selectedButton,
        ]}
        onPress={() => toggleOperation(config_pedido.inspecao)}
      >
        <Text style={styles.buttonText}>Inspeção</Text>
      </TouchableOpacity>

      {/* Picker para selecionar quantidade de peças */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Quantidade de Peças</Text>
        <Picker
          selectedValue={qtdValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => handleQtdValueChange(itemValue)}
        >
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
        </Picker>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendCommand}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearSelections}>
          <Text style={styles.clearButtonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  button: {
    backgroundColor: '#4285F4',
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 15,  // Reduzido o padding vertical para botões menores
    paddingHorizontal: 20,  // Reduzido o padding horizontal
    borderRadius: 4,
    width: '100%',  // Garante que o botão ocupe toda a largura disponível
    maxWidth: 350,  // Limita a largura máxima do botão
  },
  selectedButton: {
    backgroundColor: '#FBBC05',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,  // Reduzido o tamanho da fonte para ajustar ao novo tamanho do botão
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    maxWidth: 350,  // Define a largura máxima para as ações
  },
  sendButton: {
    backgroundColor: '#34A853',
    paddingVertical: 12,  // Botão com padding menor
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,  // Texto do botão de envio com tamanho reduzido
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#E53935',
    paddingVertical: 12,  // Botão com padding menor
    flex: 1,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,  // Texto do botão de limpar com tamanho reduzido
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  picker: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  toastContainer: {
    position: 'absolute',
    top: 20,
    left: '10%',
    right: '10%',
    backgroundColor: '#34A853',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastSuccess: {
    backgroundColor: '#4CAF50',
  },
  toastError: {
    backgroundColor: '#f44336',
  },

});


export default App;