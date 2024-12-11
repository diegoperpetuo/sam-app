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
  const [statusPeca4, setStatusPeca4] = useState<boolean | null>(null);

  const [idEstacao1, setIdEstacao1] = useState<number | null>(123);
  const [idEstacao2, setIdEstacao2] = useState<number | null>(456);
  const [idEstacao3, setIdEstacao3] = useState<number | null>(789);
  const [idEstacao4, setIdEstacao4] = useState<number | null>(101);

  const [idPeca0, setIdPeca0] = useState<number | null>(null);
  const [idPeca1, setIdPeca1] = useState<number | null>(null);
  const [idPeca2, setIdPeca2] = useState<number | null>(null);
  const [idPeca3, setIdPeca3] = useState<number | null>(null);


const IdEstacao0 = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          db_number: 29,
          offset: 0,
          bit_offset: 0,
        }),
      }
    );
    const data = await response.json();
    setIdEstacao1(data.value); // Armazena o ID da peça
    setStatusPeca1(data.value !== 0 && data.value !== null); // Atualiza o status da peça
  } catch (error) {
    console.error('Erro ao acessar IdPeca0:', error);
  }
};

const IdEstacao1 = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          db_number: 29,
          offset: 0,
          bit_offset: 0,
        }),
      }
    );
    const data = await response.json();
    setIdEstacao2(data.value); // Armazena o ID da peça
    setStatusPeca2(data.value !== 0 && data.value !== null); // Atualiza o status da peça
  } catch (error) {
    console.error('Erro ao acessar IdPeca0:', error);
  }
};
          


  const fetchIdPeca0 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset: 134,
            bit_offset: 0,
          }),
        }
      );
      const data = await response.json();
      setIdPeca0(data.value); // Armazena o ID da peça
      setStatusPeca1(data.value !== 0 && data.value !== null); // Atualiza o status da peça
    } catch (error) {
      console.error('Erro ao acessar IdPeca0:', error);
    }
  };
  
  const fetchIdPeca1 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset: 146,
            bit_offset: 0,
          }),
        }
      );
      const data = await response.json();
      setIdPeca1(data.value); // Armazena o ID da peça
      setStatusPeca2(data.value !== 0 && data.value !== null); // Atualiza o status da peça
    } catch (error) {
      console.error('Erro ao acessar IdPeca1:', error);
    }
  };
  
  const fetchIdPeca2 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset: 158,
            bit_offset: 0,
          }),
        }
      );
      const data = await response.json();
      setIdPeca2(data.value); // Armazena o ID da peça
      setStatusPeca3(data.value !== 0 && data.value !== null); // Atualiza o status da peça
    } catch (error) {
      console.error('Erro ao acessar IdPeca2:', error);
    }
  };
  
  const fetchIdPeca3 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            db_number: 29,
            offset: 170,
            bit_offset: 0,
          }),
        }
      );
      const data = await response.json();
      setIdPeca3(data.value); // Armazena o ID da peça
      setStatusPeca4(data.value !== 0 && data.value !== null); // Atualiza o status da peça
    } catch (error) {
      console.error('Erro ao acessar IdPeca3:', error);
    }
  };
  
  


  useEffect(() => {
    const interval = setInterval(() => {
      // Atualiza o ID da peça
      fetchIdPeca0();
      fetchIdPeca1();
      fetchIdPeca2();
      fetchIdPeca3();
      //teste
      IdEstacao0();
    }, 2000);
    return () => clearInterval(interval);
  }, []);



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
        <View style={[styles.indicator, { top: '25%', left: '10%' }]}>
          <View
            style={[
              styles.circle,
              { backgroundColor: statusPeca1 === true 
                ? '#34A853' 
                : '#EA4335' 
              },
            ]}
          >
          <Text style={styles.circleText}>
              {idPeca0 === 0 ? 'Sem peça no momento' : idPeca0 !== null ? `Peça: ${idPeca0}` : 'N/A'}
          </Text>
          </View>
          <Text style={styles.indicatorText}>
            <Text style={{ fontWeight: 'bold' }}>Estação 1</Text>
          </Text>
        </View>
        <View style={[styles.indicator, { top: '75%', left: '10%' }]}>
          <View
            style={[
              styles.circle,
              { backgroundColor: statusPeca2 === true ? '#34A853' : '#EA4335' },
            ]}
          >
          <Text style={styles.circleText}>
              {idPeca1 === 0 ? 'Sem peça no momento' : idPeca1 !== null ? `Peça: ${idPeca1}` : 'N/A'}
          </Text>
          </View>
          <Text style={styles.indicatorText}>
            <Text style={{ fontWeight: 'bold' }}>Estação 2</Text>
          </Text>
        </View>
        <View style={[styles.indicator, { top: '25%', right: '10%' }]}>
          <View
            style={[
              styles.circle,
              { backgroundColor: statusPeca3 === true ? '#34A853' : '#EA4335' },
            ]}
          >
          <Text style={styles.circleText}>
              {idPeca2 === 0 ? 'Sem peça no momento' : idPeca2 !== null ? `Peça: ${idPeca2}` : 'N/A'}
          </Text>
          </View>
          <Text style={styles.indicatorText}>
            <Text style={{ fontWeight: 'bold' }}>Estação 3</Text>
          </Text>
        </View>
        <View style={[styles.indicator, { top: '75%', right: '10%' }]}>
          <View
            style={[
              styles.circle,
              { backgroundColor: statusPeca4 === true ? '#34A853' : '#EA4335' },
            ]}
          >
          <Text style={styles.circleText}>
              {idPeca3 === 0 ? 'Sem peça no momento' : idPeca3 !== null ? `Peça: ${idPeca3}` : 'N/A'}
          </Text>
          </View>
          <Text style={styles.indicatorText}>
            <Text style={{ fontWeight: 'bold' }}>Estação 4</Text>
          </Text>
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
    width: 350, // Aumenta o tamanho do contêiner
    height: 500, // Aumenta a altura
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
    width: '150%', // Aumenta a largura
    height: '150%', // Aumenta a altura
    transform: [{ rotate: '90deg' }],
  },
  indicator: {
    position: 'absolute',
    alignItems: 'center',
  },
  circle: {
    width: 70, // Aumenta o tamanho do círculo
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  indicatorText: {
    marginTop: 8,
    fontSize: 16, // Aumenta o tamanho do texto
    color: '#333',
  },
});

export default App;
