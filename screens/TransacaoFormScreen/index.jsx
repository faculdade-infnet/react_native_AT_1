import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, Pressable, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import IconDate from 'react-native-vector-icons/Entypo';
import IconTime from 'react-native-vector-icons/MaterialCommunityIcons';
import obterMoedas from '../../api/obterMoedas';
import listaCategorias from '../../data/categorias';
import SalvarFirebase  from '../../api/salvarFirebase';


export default function TransacaoFormScreen() {  
  const [isLoading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]); 

  const [datePickerShow, setDatePickerShow] = useState(false);
  const [timePickerShow, setTimePickerShow] = useState(false);
  const [listaMoedas, setListaMoedas] = useState([]); 
  const [cotacao, setCotacao] = useState(0);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [moeda, setMoeda] = useState("AUD");
  const [categoria, setCategoria] = useState("Mercado");
  const [tipo, setTipo] = useState(false);    
  
  const liparCampos = () => {
    setDescricao("");
    setValor("");
  }

  const validarCampos = () => {
    console
    if (descricao === "" || valor === 0){
      if (descricao === "") {
        alert("Erro: Campo DESCRICÃO não pode estar vazio");
        return false;
      }
      else if (valor === 0) {    
        alert("Erro: Campo VALOR não pode estar vazio ou ser 0");
        return false;
      }
    }
    else{
      return true;
    }
  } 

  const onSubmit = async (novoItem) => {
    const result = validarCampos();    
    
    if (result){      
      // Formatar data para mes-dia-ano    
      const dateFormated = date.toLocaleDateString('en-US');            
      const cotacaoObtida = await getCotacao(dateFormated);              
  
      if (cotacaoObtida) {
        novoItem.cotacao = cotacaoObtida;
        const precoConvertido = parseFloat((valor * cotacaoObtida).toFixed(2));        
        novoItem.preco = precoConvertido;
        SalvarFirebase(novoItem, produtos, setProdutos, setLoading);
        liparCampos();
      } else {
        alert("Erro: Cotação não encontrada, selecione uma data válida / Falha na conecção");
      }
    }    
  }
  
  // Obter cotação em uma data específica  
  const getCotacao = async (date) => {
    try {
      const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${moeda}'&@dataCotacao='${date}'&$top=1&$format=json`);
      const data = await response.json();
  
      // Verificar se a resposta contém o valor esperado
      if (data.value && data.value.length > 0) {
        const cotacaoObtida = data.value[0]?.cotacaoCompra;  // ou 'cotacaoVenda'              
        return cotacaoObtida;
      } else {        
        return null; // Retornar null se não encontrar a cotação
      }
    } catch (error) {
      console.error("Erro ao buscar cotação:", error);
      return null; // Retornar null em caso de erro
    }
  };
  
  // Função para renderizar o componente DateTimePicker para Data
  const renderDatePicker = () => {
    // Se o state dateTimePickerShow for true o componente é rederizado
    if (datePickerShow) {
      return (
        <DateTimePicker mode='date' value={date} maximumDate={new Date()}
          onChange={(_, selectedDate) => { setDatePickerShow(false), setDate(selectedDate) }}
        />
      )
    }    
  };

  // Função para renderizar o componente DateTimePicker para Hora
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

  // Formata o valor para somente duas casas decimais
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
          placeholder='Descrição'
          keyboardType='default'
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput style={[styles.textInput, styles.text]}
          placeholder='Valor'
          keyboardType='decimal-pad'        
          value={valor}
          onChangeText={(value) => {
            const formatado = formatarValor(value);
            setValor(formatado);
          }}
        />        
      </View> 

      <View style={styles.containerTime}>
        {/* Date */}
        <Pressable style={({ pressed }) => [ styles.pressableTime, pressed ? styles.pressedTime : styles.notPressedTime ]}
            onPress={() => setDatePickerShow(true)}
        >      
          <IconDate name="calendar" style={styles.icone} size={styles.icone.size} color={styles.icone.color}/>
          <Text>{date.toLocaleDateString('pt-BR')}</Text>                         
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
          {/* <Picker.Item label="Selecione uma moeda" value="" /> */}
          { listaMoedas.map((simbolo, i) => (
              <Picker.Item key={i} label={simbolo} value={simbolo} />
            ))
          }
        </Picker>
      </View>
      <View>
        <Picker style={styles.comboBox} selectedValue={categoria} onValueChange={(value) => setCategoria(value)}>
        {/* <Picker.Item label="Selecione uma categoria" value="" /> */}
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
        onPress={ () => {
          const novoProduto = {
            descricao: descricao,
            preco: valor,
            data: date.toLocaleDateString('pt-BR'),
            time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            moeda: moeda,
            cotacao: cotacao,
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