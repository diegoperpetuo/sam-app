import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const config_pedido = {
  ip: '192.168.1.24',
  data_type: 'INT',
  data_type2: 'BOOL',
};

const App = () => {
  const [statusPeca1, setStatusPeca1] = useState<boolean | null>(null);
  const [statusPeca2, setStatusPeca2] = useState<boolean | null>(null);
  const [statusPeca3, setStatusPeca3] = useState<boolean | null>(null);
  const [statusPeca4, setStatusPeca4] = useState<boolean | null>(null); // Estação Limpeza

  // Atualiza o status da Estação de Entrada
  const EstEntrada = async () => {
    try {
      const response = await fetch(
        `rw-plc-master-production.up.railway.app/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset: 9,
            bit_offset: 3,
          }),
        }
      );
      const data = await response.json();
      setStatusPeca2(data.value === true);
    } catch (error) {
      console.error('Erro ao acessar EstEntrada:', error);
      setStatusPeca2(false);
    }
  };

  // Atualiza o status da Estação de Saída
  const EstSaida = async () => {
    try {
      const response = await fetch(
        `rw-plc-master-production.up.railway.app/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset: 9,
            bit_offset: 2,
          }),
        }
      );
      const data = await response.json();
      setStatusPeca1(data.value === true);
    } catch (error) {
      console.error('Erro ao acessar EstSaida:', error);
      setStatusPeca1(false);
    }
  };

  // Atualiza o status da Estação de Inspeção
  const EstInspecao = async () => {
    try {
      const response = await fetch(
        `rw-plc-master-production.up.railway.app/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset: 9,
            bit_offset: 1,
          }),
        }
      );
      const data = await response.json();
      setStatusPeca3(data.value === true);
    } catch (error) {
      console.error('Erro ao acessar EstInspecao:', error);
      setStatusPeca3(false);
    }
  };

  // Atualiza o status da Estação de Limpeza
  const EstLimpeza = async () => {
    try {
      const response = await fetch(
        `rw-plc-master-production.up.railway.app/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset: 9,
            bit_offset: 0,
          }),
        }
      );
      const data = await response.json();
      setStatusPeca4(data.value === true);
    } catch (error) {
      console.error('Erro ao acessar EstLimpeza:', error);
      setStatusPeca4(false);
    }
  };

  // Atualiza os estados periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      EstEntrada();
      EstSaida();
      EstInspecao();
      EstLimpeza();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Renderiza os indicadores com base no status
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status de Estações</Text>
      <View style={styles.map}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/pma.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        {/* Indicadores posicionados de forma reorganizada */}
        <View style={[styles.indicator, { top: '10%', left: '10%' }]}>
          <View
            style={[
              styles.circle,
              { backgroundColor: statusPeca1 ? '#34A853' : '#EA4335' },
            ]}
          />
          <Text style={styles.indicatorText}>Estação Saída</Text>
        </View>
        <View style={[styles.indicator, { top: '10%', right: '10%' }]}>
          <View
            style={[
              styles.circle,
              { backgroundColor: statusPeca4 ? '#34A853' : '#EA4335' },
            ]}
          />
          <Text style={styles.indicatorText}>Estação Limpeza</Text>
        </View>
        <View style={[styles.indicator, { bottom: '10%', left: '10%' }]}>
          <View
            style={[
              styles.circle,
              { backgroundColor: statusPeca2 ? '#34A853' : '#EA4335' },
            ]}
          />
          <Text style={styles.indicatorText}>Estação Entrada</Text>
        </View>
        <View style={[styles.indicator, { bottom: '10%', right: '10%' }]}>
          <View
            style={[
              styles.circle,
              { backgroundColor: statusPeca3 ? '#34A853' : '#EA4335' },
            ]}
          />
          <Text style={styles.indicatorText}>Estação Inspeção</Text>
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
    marginBottom: 40,
    color: '#333',
  },
  map: {
    width: 350,
    height: 500,
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
    width: '150%',
    height: '150%',
    transform: [{ rotate: '90deg' }],
  },
  indicator: {
    position: 'absolute',
    alignItems: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default App;