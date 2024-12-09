import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import IconDate from 'react-native-vector-icons/Entypo';
import IconTime from 'react-native-vector-icons/MaterialCommunityIcons';

const url = "https://react-native-infnet-default-rtdb.firebaseio.com/"
const resource = "transacoes"
const listaCategoria = [
  { label: 'Bar', value: 'Bar' },
  { label: 'Farmácia', value: 'Farmácia' },
  { label: 'Lanchonete', value: 'Lanchonete' },
  { label: 'Mercado', value: 'Mercado' },
  { label: 'Padaria', value: 'Padaria' },
]

export default function TransacaoFormScreen() {    
  const [isLoading, setLoading] = useState(false);
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [timePickerShow, setTimePickerShow] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [data, setData] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [moeda, setMoeda] = useState("");
  const [categoria, setCategoria] = useState("");
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
    console.log(novoItem.descricao);
    console.log(novoItem.preco);
    console.log(novoItem.data.toLocaleDateString('pt-BR'));
    console.log(novoItem.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    console.log(novoItem.moeda);
    console.log(novoItem.categoria);
    if (!novoItem.tipo){
      console.log('Receita');
    }
    else{
      console.log('Despesa');
    }

    // setLoading(true);
    // fetch(`${url}${resource}.json`, {
    //       method: "POST", // GET
    //       body: JSON.stringify(novoItem)
    // })
    // .then(async resp => {
    //       const id = await resp.json();        
    //       const listaProdutos = [...produtos];
    //       novoItem.id = id.name;
    //       listaProdutos.push(novoItem);
    //       setProdutos(listaProdutos);
    // })
    // .catch(error => { Alert.alert(error.message); })
    // .finally(_ => setLoading(false));
 }

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
          onChangeText={setPreco}
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
            <Picker.Item label="USD" value="usd" />
            <Picker.Item label="BRL" value="brl" />
        </Picker>
      </View>
      <View>
        <Picker style={styles.comboBox} selectedValue={categoria} onValueChange={(value) => setCategoria(value)}>
          {!categoria && <Picker.Item label="Selecione uma Opção" value="" />}
          {listaCategoria.map(item => (
            <Picker.Item label={item.label} value={item.value} key={item.value} />
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
            data: data,
            time: time,
            moeda: moeda,
            categoria: categoria,
            tipo: tipo,
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