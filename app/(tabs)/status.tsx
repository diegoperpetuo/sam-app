import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const config_pedido = {
  ip: '192.168.1.24',
  data_type: 'INT',
  data_type2: 'BOOL',
};

const App = () => {
  const [statusPeca1, setStatusPeca1] = useState<boolean | null>(null);
  const [statusPeca2, setStatusPeca2] = useState<boolean | null>(null);
  const [statusPeca3, setStatusPeca3] = useState<boolean | null>(null);
  const [statusPeca4, setStatusPeca4] = useState<boolean | null>(null);

  const [estacao1, setEstacao1] = useState<boolean | null>(null);
  const [estacao2, setEstacao2] = useState<boolean | null>(null);
  const [estacao3, setEstacao3] = useState<boolean | null>(null);
  const [estacao4, setEstacao4] = useState<boolean | null>(null);

  const [limpeza, setLimpeza] = useState<boolean | null>(null);

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

  const fetchLimpeza = async (setStatus: React.Dispatch<React.SetStateAction<boolean | null>>) => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset: 96,
            bit_offset: 0,
          }),
        }
      );
      const data = await response.json();
      setStatus(data.value);
    } catch (error) {
      console.error('Erro ao acessar status de limpeza:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus(144, setStatusPeca1);
      fetchStatus(156, setStatusPeca2);
      fetchStatus(168, setStatusPeca3);
      fetchStatus(180, setStatusPeca4);
      fetchStatus(85, setEstacao1);
      // fetchStatus(86, setEstacao2);
      // fetchStatus(87, setEstacao3);
      // fetchStatus(88, setEstacao4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Quando estacao1 for true, então buscamos o status de limpeza
    if (estacao1 === true) {
      fetchLimpeza(setLimpeza);
    }
  }, [estacao1]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status de Estações</Text>
      <View style={styles.map}>
        <View style={styles.imageContainer}>
          <Image
            source={require('C:/Users/diego/sam/assets/images/pma.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        {/* Indicadores sobre a imagem */}
        <View style={[styles.indicator, { top: '30%', left: '10%' }]}>
          <FontAwesome
            name="circle"
            size={50}
            color={statusPeca1 === true ? '#34A853' : '#EA4335'}
          />
          <Text style={styles.indicatorText}>Estação 1</Text>
          {/* Exibe o valor de limpeza se estacao1 for true */}
          {estacao1 && limpeza !== null && (
            <Text style={styles.limpezaText}>{limpeza ? 'Limpeza em andamento' : 'Limpeza finalizada'}</Text>
          )}
        </View>
        <View style={[styles.indicator, { top: '80%', left: '10%' }]}>
          <FontAwesome
            name="circle"
            size={50}
            color={statusPeca2 === true ? '#34A853' : '#EA4335'}
          />
          <Text style={styles.indicatorText}>Estação 2</Text>
        </View>
        <View style={[styles.indicator, { top: '30%', right: '10%' }]}>
          <FontAwesome
            name="circle"
            size={50}
            color={statusPeca3 === true ? '#34A853' : '#EA4335'}
          />
          <Text style={styles.indicatorText}>Estação 3</Text>
        </View>
        <View style={[styles.indicator, { top: '80%', right: '10%' }]}>
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
    width: 350,
    height: 450,
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4A90E2',
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#E3F2FD',
  },
  image: {
    width: '110%',
    height: '110%',
    transform: [{ rotate: '90deg' }],
  },
  indicator: {
    position: 'absolute',
    alignItems: 'center',
  },
  indicatorText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  limpezaText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
});

export default App;
