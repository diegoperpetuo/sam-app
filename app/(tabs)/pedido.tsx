import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

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

// Função para enviar o comando ao Siemens
const Pedido = async (totalValue: number) => {
  try {
    const response1 = await fetch(`http://localhost:8000/plc/siemens/write?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}&value=${totalValue}`, {
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
  const response2 = await fetch(`http://localhost:8000/plc/siemens/write?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}&value=0`, {
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
  
  const response3 = await fetch(`http://localhost:8000/plc/siemens/write?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}&value=1`, {
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


const App = () => {
  const [selectedOperations, setSelectedOperations] = useState<number[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const fadeAnim = new Animated.Value(1);

  // Função para alternar a seleção de uma operação
  const toggleOperation = (operationValue: number) => {
    setSelectedOperations((prevOperations) => {
      if (prevOperations.includes(operationValue)) {
        return prevOperations.filter((value) => value !== operationValue);
      } else {
        return [...prevOperations, operationValue];
      }
    });
  };

  // Calcula o valor total das operações selecionadas
  const calculateTotalValue = () => {
    return selectedOperations.reduce((total, value) => total + value, 0);
  };

  // Função para exibir a mensagem de confirmação
  const showToast = () => {
    setShowConfirmation(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000, // Tempo para o desaparecimento (3 segundos)
      useNativeDriver: true,
    }).start(() => {
      setShowConfirmation(false);
      fadeAnim.setValue(1); // Reseta a opacidade
    });
  };

  // Função para enviar o comando
  const handleSendCommand = () => {
    const totalValue = calculateTotalValue();
    console.log('Comando enviado:', totalValue);

    // Envia o comando ao Siemens
    Pedido(totalValue);
    setTimeout(() => {
     Pedido2();
     Pedido3();
     Pedido2();
   }, 1000); // 1000 ms = 1 segundo

    // Exibe o Toast de confirmação
    showToast();

    // Limpa os botões selecionados
    setSelectedOperations([]);
  };

  // Função para limpar as seleções
  const handleClearSelections = () => {
    setSelectedOperations([]);
  };

  // Verifica se uma operação está selecionada
  const isSelected = (operationValue: number) =>
    selectedOperations.includes(operationValue);

  // Verifica se o botão deve ser desativado
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pedidos</Text>
      </View>

      {showConfirmation && (
        <Animated.View
          style={[styles.toastContainer, { opacity: fadeAnim }]}
        >
          <Text style={styles.toastText}>Pedido enviado com sucesso!</Text>
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
  button: {
    backgroundColor: '#4285F4',
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  selectedButton: {
    backgroundColor: '#FBBC05',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sendButton: {
    backgroundColor: '#34A853',
    paddingVertical: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#E53935',
    paddingVertical: 15,
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
    fontSize: 18,
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
});

export default App;
