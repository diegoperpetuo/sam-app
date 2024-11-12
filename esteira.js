const ativarEsteira = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/plc/rockwell/write', { // Substitua 192.168.X.X pelo IP do seu servidor
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ip: '192.168.1.61', // IP do Rockwell
                data_type: 'BOOL', // Tipo de dado para ativação 
                tag: {                    
                    "name": "Power_Flex_ESTEIRA:O.Start"
                },
                value: 1 // Valor que ativa a planta (1 para ligar, 0 para desligar)
            }),
        });
  
        if (response.ok) {
            Alert.alert('Planta ativada com sucesso!');
        } else {
            Alert.alert('Erro ao ativar a planta');
        }
    } catch (error) {
        console.error(error);
    }
  };

  ativarEsteira();