import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, Pressable, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import IconDate from 'react-native-vector-icons/Entypo';
import IconTime from 'react-native-vector-icons/MaterialCommunityIcons';
import obterMoedas from '../../api/obterMoedas';
import SalvarFirebase  from '../../api/salvarFirebase';


export default function TransacaoForm({onSubmit, listaMoedas, listaCategorias}) {      
    const [datePickerShow, setDatePickerShow] = useState(false);
    const [timePickerShow, setTimePickerShow] = useState(false);      

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [moeda, setMoeda] = useState("AUD");
    const [categoria, setCategoria] = useState("Mercado");
    const [tipo, setTipo] = useState(false);  
    
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

    // Formata o valor para somente duas casas decimais
    const formatarValor = (valor) => {
        // Remove caracteres não numéricos exceto ponto (.)
        const somenteNumeros = valor.replace(/[^0-9.]/g, "");
    
        // Garante que haverá no máximo um ponto decimal
        const [inteiro, decimal] = somenteNumeros.split(".");
        let valorFormatado = inteiro;
    
        if (decimal !== undefined) {
        valorFormatado += "." + decimal.slice(0, 2);
        }
        setValor(valorFormatado);    
    };
  
    // Limpa os campos
    const limparCampos = () => {
        setDescricao("");
        setValor("");
    }

    // Verifica se os campos foram preenchidos
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

    const onSave = async (novoItem) => {     
        // Formatar data para mes-dia-ano               
        novoItem.date = date.toLocaleDateString('en-US');        
        const result = validarCampos();

        if (result){             
            await onSubmit(novoItem);            
            limparCampos();
        }
    }


    return (
        <View style={styles.container}>
        {/* Descricao | Valor */}
        <View>
            <TextInput style={[styles.textInput, styles.text, styles.box]}
            placeholder='Descrição'
            keyboardType='default'
            value={descricao}
            onChangeText={setDescricao}
            />
            <TextInput style={[styles.textInput, styles.text, styles.box]}
            placeholder='Valor'
            keyboardType='decimal-pad'        
            value={valor}
            onChangeText={(value) => {formatarValor(value)}}
            />        
        </View> 

        <View style={[styles.containerTime, styles.box]}>
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
        <View style={styles.box}>
            <Picker selectedValue={moeda} onValueChange={(value) => setMoeda(value)}>
            {/* <Picker.Item label="Selecione uma moeda" value="" /> */}
            { listaMoedas.map((simbolo, i) => (
                <Picker.Item key={i} label={simbolo} value={simbolo} />
                ))
            }
            </Picker>
        </View>
        <View style={styles.box}>
            <Picker selectedValue={categoria} onValueChange={(value) => setCategoria(value)}>
            {/* <Picker.Item label="Selecione uma categoria" value="" /> */}
            {listaCategorias.map((item, i )=> (
                <Picker.Item key={i} label={item.label} value={item.value} />
            ))}
            </Picker>
        </View>

        {/* Switch */}
        <View style={[styles.containerSwitch, styles.box]}>  
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
            const novoItem = {
                descricao: descricao,
                preco: valor,
                date: date.toLocaleDateString('pt-BR'),
                time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                moeda: moeda,
                cotacao: 0,
                categoria: categoria,
                tipo: tipo ? "Despesa": "Receita",
            };
            onSave(novoItem);
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
        height: '100%',      
        justifyContent: "center",    
        paddingHorizontal: 10,
    },
    box:{         
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
        paddingRight:10,  
    },
    containerSwitch:{
        flexDirection: "row",
        justifyContent: 'space-between', 
        alignItems: "center",
        paddingHorizontal: 10,                  
    }, 
    switch: {
        flexDirection: "row",
        alignItems: "center",    
        marginVertical: 5,
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
    textInput: {        
        padding: 10,          
    },  
    button: {   
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    text:{
        fontSize: 20, 
    }  
})