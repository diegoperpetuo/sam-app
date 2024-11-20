import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const config_pedido = {
  ip: '192.168.1.24',
  data_type: 'INT',
  data_type2: 'BOOL',
};

const App = () => {
  const [statusSolicitado, setStatusSolicitado] = useState<boolean | null>(null);
  const [statusReceba, setStatusReceba] = useState<boolean | null>(null);
  const [statusRealizado, setStatusRealizado] = useState<boolean | null>(null);
  const [idPeca, setIdPeca] = useState<number | null>(null);
  const [dataHoraSolicitado, setDataHoraSolicitado] = useState<string | null>(null);

  const fetchSolicitado = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 0, bit_offset: 0 }),
        }
      );
      const data = await response.json();
      setStatusSolicitado(data.value);
    } catch (error) {
      console.error('Erro ao acessar Solicitado:', error);
    }
  };

  const fetchReceba = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 0, bit_offset: 1 }),
        }
      );
      const data = await response.json();
      setStatusReceba(data.value);
    } catch (error) {
      console.error('Erro ao acessar Receba:', error);
    }
  };

  const fetchRealizado = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 0, bit_offset: 2 }),
        }
      );
      const data = await response.json();
      setStatusRealizado(data.value);
    } catch (error) {
      console.error('Erro ao acessar Realizado:', error);
    }
  };

  const fetchIdPeca = async () => {
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
      setIdPeca(data.value); // Armazena o ID da peça
    } catch (error) {
      console.error('Erro ao acessar IdPeca:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSolicitado();
      fetchReceba();
      fetchRealizado();
      fetchIdPeca(); // Atualiza o ID da peça
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Captura a data e hora quando o statusSolicitado muda para "true"
  useEffect(() => {
    if (statusSolicitado === true && !dataHoraSolicitado) {
      const agora = new Date();
      const dataHoraFormatada = `${agora.toLocaleDateString()} ${agora.toLocaleTimeString()}`;
      setDataHoraSolicitado(dataHoraFormatada);
    }
  }, [statusSolicitado]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status do Pedido</Text>
      <View style={styles.timeline}>
        {/* Solicitado */}
        <View style={styles.timelineItem}>
          <FontAwesome
            name="circle"
            size={24}
            color={
              statusSolicitado === true
                ? '#34A853'
                : statusSolicitado === false
                ? '#EA4335'
                : '#CCCCCC'
            }
          />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineText}>Pedido Solicitado</Text>
            <Text style={styles.timelineSubText}>
              {statusSolicitado === true
                ? 'Concluído'
                : statusSolicitado === false
                ? 'Pendente'
                : 'Desconhecido'}
            </Text>
            {/* Exibição do IdPeca */}
            <Text style={styles.idText}>
              {idPeca !== null ? `ID Peça: ${idPeca}` : 'Carregando ID...'}
            </Text>
            {/* Exibição da Data e Hora */}
            <Text style={styles.dateTimeText}>
              {dataHoraSolicitado ? `Solicitado em: ${dataHoraSolicitado}` : ''}
            </Text>
          </View>
        </View>

        {/* Linha */}
        <View style={styles.timelineLine} />
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
  timeline: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timelineContent: {
    marginLeft: 10,
  },
  timelineText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  timelineSubText: {
    fontSize: 14,
    color: '#666',
  },
  idText: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 5,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  timelineLine: {
    width: 2,
    height: 30,
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
});

export default App;
