import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const config_pedido = {
  ip: '192.168.1.24',
  data_type2: 'BOOL',
};

const App = () => {
  const [statusPeca1, setStatusPeca1] = useState<boolean | null>(null);
  const [statusPeca2, setStatusPeca2] = useState<boolean | null>(null);
  const [statusPeca3, setStatusPeca3] = useState<boolean | null>(null);
  const [statusPeca4, setStatusPeca4] = useState<boolean | null>(null);

  const fetchStatus = async (offset: number, setStatus: React.Dispatch<React.SetStateAction<boolean | null>>) => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset,
            bit_offset: 0,
          }),
        }
      );
      const data = await response.json();
      setStatus(data.value);
    } catch (error) {
      console.error('Erro ao acessar status da peça:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus(144, setStatusPeca1);
      fetchStatus(156, setStatusPeca2);
      fetchStatus(168, setStatusPeca3);
      fetchStatus(180, setStatusPeca4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status de Estações</Text>
      <View style={styles.map}>
        {/* Indicadores lado esquerdo */}
        <View style={[styles.indicator, styles.indicatorLeft, { top: '20%' }]}>
          <FontAwesome
            name="circle"
            size={50}
            color={statusPeca1 === true ? '#34A853' : '#EA4335'}
          />
          <Text style={styles.indicatorText}>Estação 1</Text>
        </View>
        <View style={[styles.indicator, styles.indicatorLeft, { top: '80%' }]}>
          <FontAwesome
            name="circle"
            size={50}
            color={statusPeca2 === true ? '#34A853' : '#EA4335'}
          />
          <Text style={styles.indicatorText}>Estação 2</Text>
        </View>

        {/* Indicadores lado direito */}
        <View style={[styles.indicator, styles.indicatorRight, { top: '20%' }]}>
          <FontAwesome
            name="circle"
            size={50}
            color={statusPeca3 === true ? '#34A853' : '#EA4335'}
          />
          <Text style={styles.indicatorText}>Estação 3</Text>
        </View>
        <View style={[styles.indicator, styles.indicatorRight, { top: '80%' }]}>
          <FontAwesome
            name="circle"
            size={50}
            color={statusPeca4 === true ? '#34A853' : '#EA4335'}
          />
          <Text style={styles.indicatorText}>Estação 4</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  map: {
    width: 300,
    height: 400, // Expande verticalmente o retângulo
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    position: 'relative', // Permite posicionamento absoluto dos indicadores
  },
  indicator: {
    position: 'absolute',
    alignItems: 'center',
  },
  indicatorLeft: {
    left: -30, // Move os indicadores para ficarem sobre a borda
  },
  indicatorRight: {
    right: -30, // Move os indicadores para ficarem sobre a borda
  },
  indicatorText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default App;
