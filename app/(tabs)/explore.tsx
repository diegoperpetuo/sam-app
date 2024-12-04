import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const config_pedido = {
  ip: '192.168.1.24',
  data_type: 'INT',
  data_type2: 'BOOL',
};

const App = () => {
  const [statusSolicitado, setStatusSolicitado] = useState<boolean | null>(null);
  const [statusSolicitado1, setStatusSolicitado1] = useState<boolean | null>(null);
  const [statusSolicitado2, setStatusSolicitado2] = useState<boolean | null>(null);
  const [statusSolicitado3, setStatusSolicitado3] = useState<boolean | null>(null);

    //ID das peças
  const [idPeca0, setIdPeca0,] = useState<number | null>(null);
  const [idPeca1, setIdPeca1,] = useState<number | null>(null);
  const [idPeca2, setIdPeca2,] = useState<number | null>(null);
  const [idPeca3, setIdPeca3,] = useState<number | null>(null);
  
  const [dataHoraSolicitado, setDataHoraSolicitado] = useState<string | null>(null);

  const [dataHoraFinalizado, setDataHoraFinalizado] = useState<string | null>(null);
  const [dataHoraFinalizado1, setDataHoraFinalizado1] = useState<string | null>(null);
  const [dataHoraFinalizado2, setDataHoraFinalizado2] = useState<string | null>(null);
  const [dataHoraFinalizado3, setDataHoraFinalizado3] = useState<string | null>(null);
  
  const [Processo0, setProcesso0] = useState<string | null>(null);
  const [Processo1, setProcesso1] = useState<string | null>(null);
  const [Processo2, setProcesso2] = useState<string | null>(null);
  const [Processo3, setProcesso3] = useState<string | null>(null);
  
  const processoMap = {
    2: 'Furação 3s',
    4: 'Limpeza Parcial',
    8: 'Inspeção',
    16: 'Limpeza Completa',
    32: 'Furação 5s'
  };
  
  const formatProcesso = (value: string | number | null) => {
    if (value === 0) return 'Saída';
    const names: any[] = [];
    if (typeof value === 'number') {
      Object.entries(processoMap).forEach(([key, name]) => {
        if ((value & parseInt(key)) !== 0) {
          names.push(name);
        }
      });
    }
    return names.join(', ');
  };
  
  
  const fetchProducao0 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 144, bit_offset: 0 }),
        }
      );
      const data = await response.json();
      setStatusSolicitado(data.value);
    } catch (error) {
      console.error('Erro ao acessar:', error);
    }
  };

  const fetchProducao1 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 156, bit_offset: 0 }),
        }
      );
      const data = await response.json();
      setStatusSolicitado1(data.value);
    } catch (error) {
      console.error('Erro ao acessar:', error);
    }
  };

  const fetchProducao2 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 168, bit_offset: 0 }),
        }
      );
      const data = await response.json();
      setStatusSolicitado2(data.value);
    } catch (error) {
      console.error('Erro ao acessar:', error);
    }
  };

  const fetchProducao3 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 180, bit_offset: 0 }),
        }
      );
      const data = await response.json();
      setStatusSolicitado3(data.value);
    } catch (error) {
      console.error('Erro ao acessar:', error);
    }
  };

  const est_processo0 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 142, bit_offset: 0}),
        }
      );
      const data = await response.json();
      setProcesso0(data.value);
    } catch (error) {
      console.error('Erro ao acessar:', error);
    }
  };


  const est_processo1 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 154, bit_offset: 0}),
        }
      );
      const data = await response.json();
      setProcesso1(data.value);
    } catch (error) {
      console.error('Erro ao acessar:', error);
    }
  };

  const est_processo2 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 166, bit_offset: 0}),
        }
      );
      const data = await response.json();
      setProcesso2(data.value);
    } catch (error) {
      console.error('Erro ao acessar:', error);
    }
  };

  const est_processo3 = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/plc/siemens/read?ip=${config_pedido.ip}&data_type=${config_pedido.data_type}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ db_number: 29, offset: 178, bit_offset: 0}),
        }
      );
      const data = await response.json();
      setProcesso3(data.value);
    } catch (error) {
      console.error('Erro ao acessar:', error);
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
    } catch (error) {
      console.error('Erro ao acessar IdPeca:', error);
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
    } catch (error) {
      console.error('Erro ao acessar IdPeca:', error);
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
    } catch (error) {
      console.error('Erro ao acessar IdPeca:', error);
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
    } catch (error) {
      console.error('Erro ao acessar IdPeca:', error);
    }
  };
  


  useEffect(() => {
    const interval = setInterval(() => {
      fetchProducao0();
      fetchProducao1();
      fetchProducao2();
      fetchProducao3();
      est_processo0();
      est_processo1();
      est_processo2();
      est_processo3();
      // Atualiza o ID da peça
      fetchIdPeca0();
      fetchIdPeca1();
      fetchIdPeca2();
      fetchIdPeca3();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Captura a data e hora quando pedido é solicitado
  useEffect(() => {
    if (statusSolicitado === true ||!dataHoraSolicitado) {
      const agora = new Date();
      const dataHoraFormatada = `${agora.toLocaleDateString()} ${agora.toLocaleTimeString()}`;
      setDataHoraSolicitado(dataHoraFormatada);

    }
    if (statusSolicitado1 === true) {
      const agora1 = new Date();
      const dataHoraFormatada1 = `${agora1.toLocaleDateString()} ${agora1.toLocaleTimeString()}`;
      setDataHoraSolicitado(dataHoraFormatada1);
    }
    if (statusSolicitado2 === true) {
      const agora2 = new Date();
      const dataHoraFormatada2 = `${agora2.toLocaleDateString()} ${agora2.toLocaleTimeString()}`;
      setDataHoraSolicitado(dataHoraFormatada2);
    }
    if (statusSolicitado3 === true) {
      const agora3 = new Date();
      const dataHoraFormatada3 = `${agora3.toLocaleDateString()} ${agora3.toLocaleTimeString()}`;
      setDataHoraSolicitado(dataHoraFormatada3);
    }
    if (statusSolicitado === false) {
      const agora = new Date();
      const dataHoraFormatada = `${agora.toLocaleDateString()} ${agora.toLocaleTimeString()}`;
      setDataHoraFinalizado(dataHoraFormatada);
    }
    if (statusSolicitado1 === false) {
      const agora1 = new Date();
      const dataHoraFormatada1 = `${agora1.toLocaleDateString()} ${agora1.toLocaleTimeString()}`;
      setDataHoraFinalizado(dataHoraFormatada1);
    }
    if (statusSolicitado2 === false) {
      const agora2 = new Date();
      const dataHoraFormatada2 = `${agora2.toLocaleDateString()} ${agora2.toLocaleTimeString()}`;
      setDataHoraFinalizado(dataHoraFormatada2);
    }
    if (statusSolicitado3 === false) {
      const agora3 = new Date();
      const dataHoraFormatada3 = `${agora3.toLocaleDateString()} ${agora3.toLocaleTimeString()}`;
      setDataHoraFinalizado(dataHoraFormatada3);
    }
  }, [statusSolicitado]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status do Pedido</Text>
      {/* Adicionando o ScrollView */}
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} // Oculta a barra de rolagem
      >
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <FontAwesome
            name="circle"
            size={24}
            color={
              idPeca0 === 0 && statusSolicitado === null
                ? '#CCCCCC' // Cor de "sem peça no momento"
                : statusSolicitado === true
                ? '#34A853' // Verde, se o status estiver solicitado
                : statusSolicitado === false
                ? '#EA4335' // Vermelho, se o status for parado
                : '#CCCCCC' // Cor neutra
            }
          />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineText}>Peça 0</Text>
            <Text style={styles.idText}>
              {idPeca0 === 0 ? 'Sem peça no momento' : idPeca0 !== null ? `ID Peça: ${idPeca0}` : 'Carregando ID...'}
            </Text>
            <Text style={styles.timelineSubText}>
              {idPeca0 === 0
                ? 'Sem peça no momento'
                : statusSolicitado === true
                ? 'Em andamento'
                : statusSolicitado === false
                ? 'Processo parado'
                : 'Desconhecido'}
            </Text>
            <Text style={styles.idText}>
              {idPeca0 === 0
                ? 'Processo atual: N/A'
                : idPeca0 !== null && statusSolicitado === true
                ? `Processo atual: ${formatProcesso(Processo0)}`
                : statusSolicitado === false
                ? 'Peça fora de produção'
                : 'Processo atual: Desconhecido'}
            </Text>
            <Text style={styles.dateTimeText}>
              {statusSolicitado === true ? `Solicitado em: ${dataHoraSolicitado}` : `Finalizado em: ${dataHoraFinalizado}`}	
            </Text>
          </View>
        </View>
      </View>


      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <FontAwesome
            name="circle"
            size={24}
            color={
              idPeca1 === 0  && statusSolicitado1 === null
                ? '#CCCCCC' // Cor de "sem peça no momento"
                : statusSolicitado1 === true
                ? '#34A853' // Verde, se o status estiver solicitado
                : statusSolicitado1 === false
                ? '#EA4335' // Vermelho, se o status for parado
                : '#CCCCCC' // Cor neutra
            }
          />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineText}>Peça 1</Text>
            <Text style={styles.idText}>
              {idPeca1 === 0 ? 'Sem peça no momento' : idPeca1 !== null ? `ID Peça: ${idPeca1}` : 'Carregando ID...'}
            </Text>
            <Text style={styles.timelineSubText}>
              {idPeca1 === 0
                ? 'Sem peça no momento'
                : statusSolicitado1 === true
                ? 'Em andamento'
                : statusSolicitado1 === false
                ? 'Processo parado'
                : 'Desconhecido'}
            </Text>
            <Text style={styles.idText}>
              {idPeca1 === 0
                ? 'Estação atual: N/A'
                : idPeca1 !== null && statusSolicitado1 === true
                ? `Processo atual: ${formatProcesso(Processo1)}`
                : statusSolicitado1 === false
                ? 'Peça fora de produção'
                : 'Processo atual: Desconhecido'}
            </Text>
            <Text style={styles.dateTimeText}>
              {statusSolicitado1 === true ? `Solicitado em: ${dataHoraSolicitado}` : `Finalizado em: ${dataHoraFinalizado}`}
            </Text>
          </View>
        </View>
      </View>


      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <FontAwesome
            name="circle"
            size={24}
            color={
              idPeca2 === 0  && statusSolicitado2 === null
                ? '#CCCCCC' // Cor de "sem peça no momento"
                : statusSolicitado2 === true
                ? '#34A853' // Verde, se o status estiver solicitado
                : statusSolicitado2 === false
                ? '#EA4335' // Vermelho, se o status for parado
                : '#CCCCCC' // Cor neutra
            }
          />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineText}>Peça 2</Text>
            <Text style={styles.idText}>
              {idPeca2 === 0 ? 'Sem peça no momento' : idPeca2 !== null ? `ID Peça: ${idPeca2}` : 'Carregando ID...'}
            </Text>
            <Text style={styles.timelineSubText}>
              {idPeca2 === 0
                ? 'Sem peça no momento'
                : statusSolicitado2 === true
                ? 'Em andamento'
                : statusSolicitado2 === false
                ? 'Processo parado'
                : 'Desconhecido'}
            </Text>
            <Text style={styles.idText}>
              {idPeca2 === 0
                ? 'Estação atual: N/A'
                : idPeca2 !== null && statusSolicitado2 === true
                ? `Processo atual: ${formatProcesso(Processo2)}`
                : statusSolicitado2 === false
                ? 'Peça fora de produção'
                : 'Processo atual: Desconhecido'}
            </Text>
            <Text style={styles.dateTimeText}>
              {statusSolicitado2 === true ? `Solicitado em: ${dataHoraSolicitado}` : `Finalizado em: ${dataHoraFinalizado}`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <FontAwesome
            name="circle"
            size={24}
            color={
              idPeca3 === 0  && statusSolicitado3 === null
                ? '#CCCCCC' // Cor de "sem peça no momento"
                : statusSolicitado3 === true
                ? '#34A853' // Verde, se o status estiver solicitado
                : statusSolicitado3 === false
                ? '#EA4335' // Vermelho, se o status for parado
                : '#CCCCCC' // Cor neutra
            }
          />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineText}>Peça 3</Text>
            <Text style={styles.idText}>
              {idPeca3 === 0 ? 'Sem peça no momento' : idPeca3 !== null ? `ID Peça: ${idPeca3}` : 'Carregando ID...'}
            </Text>
            <Text style={styles.timelineSubText}>
              {idPeca3 === 0
                ? 'Sem peça no momento'
                : statusSolicitado3 === true
                ? 'Em andamento'
                : statusSolicitado3 === false
                ? 'Processo parado'
                : 'Desconhecido'}
            </Text>
            <Text style={styles.idText}>
              {idPeca3 === 0
                ? 'Estação atual: N/A'
                : idPeca3 !== null && statusSolicitado3 === true
                ? `Processo atual: ${formatProcesso(Processo3)}`
                : statusSolicitado3 === false
                ? 'Peça fora de produção'
                : 'Processo atual: Desconhecido'}
            </Text>
            <Text style={styles.dateTimeText}>
              {statusSolicitado3 ? `Solicitado em: ${dataHoraSolicitado}` : `Finalizado em: ${dataHoraFinalizado}`}
            </Text>
          </View>
        </View>
      </View>

        {/* Mais timelines conforme necessário */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
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
    marginBottom: 16, // Espaçamento entre as timelines
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
