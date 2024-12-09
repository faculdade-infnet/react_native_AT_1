import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import IconDate from 'react-native-vector-icons/Entypo';
import IconTime from 'react-native-vector-icons/MaterialCommunityIcons';
import obterMoedas from '../../api/obterMoedas';
import listaCategorias from '../../data/categorias';
import firebase from '../../api/parametros';


export default function TransacaoFormScreen() {  
  const [isLoading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]); 

  const [datePickerShow, setDatePickerShow] = useState(false);
  const [timePickerShow, setTimePickerShow] = useState(false);
  const [listaMoedas, setListaMoedas] = useState([]); 

  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [data, setData] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [moeda, setMoeda] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [tipo, setTipo] = useState(false);    

  const renderDatePicker = () => {
    // Se o state dateTimePickerShow for true o componente é rederizado
    if (datePickerShow) {
      return (
        <DateTimePicker mode='date' value={data} maximumDate={new Date()}
          onChange={(_, selectedDate) => { setDatePickerShow(false), setData(selectedDate) }}
        />
      )
    }    
  };
  
  const renderTimePicker = () => {
    // Se o state dateTimePickerShow for true o componente é rederizado
    if (timePickerShow) {
      return (
        <DateTimePicker mode='time' value={time} is24Hour={true}
          onChange={(_, selectedTime) => { setTimePickerShow(false), setTime(selectedTime) }}
        />
      )
    }    
  };

  const onSubmit = (novoItem) => {
    setLoading(true);
    fetch(`${firebase.url}${firebase.transacoes}.json`, {
          method: "POST",
          body: JSON.stringify(novoItem)
    })
    .then(async resp => {
          const id = await resp.json();       
          const novoItemComId = { ...novoItem, id: id.name }; 
          const listaProdutos = [...produtos,- novoItemComId];          
          setProdutos(listaProdutos);
          alert("Transação cadastrada com sucesso!");
    })
    .catch(error => { Alert.alert(error.message); })
    .finally(_ => setLoading(false));    
  }

  // Função para carregar as moedas
  const carregarMoedas = async () => {
    try {
      const simbolos = await obterMoedas();  // Chama a função obterMoedas para pegar os símbolos
      if (Array.isArray(simbolos)) {
        setListaMoedas(simbolos); // Atualiza o estado com os símbolos das moedas
      } else {
        console.error("Erro: A resposta das moedas não é um array.");
      }
    } catch (error) {
      console.error("Erro ao carregar as moedas:", error);
    }
  };

  const formatarValor = (valor) => {
    // Remove caracteres não numéricos exceto ponto (.)
    const somenteNumeros = valor.replace(/[^0-9.]/g, "");
  
    // Garante que haverá no máximo um ponto decimal
    const [inteiro, decimal] = somenteNumeros.split(".");
    let formatado = inteiro;
  
    if (decimal !== undefined) {
      formatado += "." + decimal.slice(0, 2);
    }
  
    return formatado;
  };
  

  useEffect(() => {    
    carregarMoedas();
  }, []);
 

  return (
    <View style={styles.container}>
      {/* Descricao | Valor */}
      <View style={styles.containerChild}>
        <TextInput style={[styles.textInput, styles.text]}
          placeholder='Descricao'
          keyboardType='default'
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput style={[styles.textInput, styles.text]}
          placeholder='Valor'
          keyboardType='decimal-pad'        
          value={preco}
          onChangeText={(value) => {
            const formatado = formatarValor(value);
            setPreco(formatado);
          }}
        />        
      </View> 

      <View style={styles.containerTime}>
        {/* Date */}
        <Pressable style={({ pressed }) => [ styles.pressableTime, pressed ? styles.pressedTime : styles.notPressedTime ]}
            onPress={() => setDatePickerShow(true)}
        >      
          <IconDate name="calendar" style={styles.icone} size={styles.icone.size} color={styles.icone.color}/>
          <Text>{data.toLocaleDateString('pt-BR')}</Text>     
        </Pressable>
          {renderDatePicker('date')}

        {/* Time */}
        <Pressable style={({ pressed }) => [ styles.pressableTime, pressed ? styles.pressedTime : styles.notPressedTime ]}
            onPress={() => setTimePickerShow(true)}
        >      
          <IconTime name="timetable" style={styles.icone} size={styles.icone.size} color={styles.icone.color}/>
          <Text>{time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>    
        </Pressable>
          {renderTimePicker('time')}
      </View> 

      {/* Select */}
      <View>
        <Picker style={styles.comboBox} selectedValue={moeda} onValueChange={(value) => setMoeda(value)}>
          <Picker.Item label="Selecione uma moeda" value="" />
          { listaMoedas.map((simbolo, i) => (
              <Picker.Item key={i} label={simbolo} value={simbolo} />
            ))
          }
        </Picker>
      </View>
      <View>
        <Picker style={styles.comboBox} selectedValue={categoria} onValueChange={(value) => setCategoria(value)}>
        <Picker.Item label="Selecione uma categoria" value="" />
          {listaCategorias.map((item, i )=> (
            <Picker.Item key={i} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>

      {/* Switch */}
      <View style={styles.containerSwitch}>  
        <View>
          <Text>Tipo: </Text>
        </View>
        <View style={styles.switch}>      
          <Text>Receita</Text>
          <Switch value={tipo} onValueChange={setTipo} />
          <Text>Despesa</Text>
          </View>
      </View>

      {/* Button */}
      <Pressable style={ styles.button } 
        onPress={() => {
          const novoProduto = {
            descricao: descricao,
            preco: preco,
            data: data.toLocaleDateString('pt-BR'),
            time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            moeda: moeda,
            categoria: categoria,
            tipo: tipo ? "Desepesa": "Receita",
          };
          onSubmit(novoProduto);
        }}
      >
        <IconDate name="save" 
          size={styles.icone.size} 
          color={styles.icone.color}
          style={styles.icone}/>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: "center",    
    backgroundColor: "#fff",       
    paddingHorizontal: 10,
  },
  comboBox:{
    color: "#000000",
    alignItems: "center",
    paddingHorizontal: 10,  
    marginVertical: 5,
    backgroundColor: "#e6e8e9",
    borderBottomWidth: 1,
    borderBottomColor: "#3e3e3e",
    borderRadius: 5
  }, 
  containerTime:{
    flexDirection: "row",
    justifyContent: 'space-between', 
    alignItems: "center",
    paddingHorizontal: 5,  
    marginVertical: 5,
    backgroundColor: "#e6e8e9",
    borderBottomWidth: 1,
    borderBottomColor: "#3e3e3e",
    borderRadius: 5,
    paddingRight:10,  
  },
  pressableTime: {  
    flexDirection: "row",    
    marginRight: 10,
    paddingRight: 10,
    marginVertical: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e8e9',  
  },
  pressedTime: {
    backgroundColor: '#3e3e3e',    
  },
  notPressedTime: {
    // backgroundColor: '#e6e8e9',  
  },
  containerImage: {
    marginBottom: 100,
  }, 
  icone: {
    size: 40, 
    color: "#000",
    margin: 10,  
  },  
  containerChild:{
    width: '100%',
    justifyContent: "flex-end"
  },
  textInput: {
    padding: 10,  
    marginVertical: 5,
    backgroundColor: "#e6e8e9",
    borderBottomWidth: 1,
    borderBottomColor: "#3e3e3e",
    borderRadius: 5
  }, 
  containerSwitch:{
    flexDirection: "row",
    justifyContent: 'space-between', 
    alignItems: "center",
    paddingHorizontal: 10,  
    marginVertical: 5,
    backgroundColor: "#e6e8e9",
    borderBottomWidth: 1,
    borderBottomColor: "#3e3e3e",
    borderRadius: 5
  }, 
  switch: {
    flexDirection: "row",
    alignItems: "center",    
    marginVertical: 5,
  },  
  button: {   
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  text:{
    fontSize: 20, 
    justifyContentHorizontal: "center",    
  }  
})