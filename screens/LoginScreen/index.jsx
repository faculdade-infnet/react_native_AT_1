import { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable } from 'react-native';

export default function HomeScreen ({ navigation }){  
  const [userName, setUserName] = useState("");
  const [userSenha, setUserSenha] = useState("");

  const imgUser = 'https://img.freepik.com/vetores-premium/icone-de-circulo-de-usuario-anonimo-estilo-simples-de-ilustracao-vetorial-com-sombra-longa_520826-1931.jpg?w=740'
  
  const verifyLogin = () => {
    if(userName == 'admin' && userSenha == '00'){
      navigation.navigate('home');
    }
  }

  return (    
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={{ uri: imgUser }} 
          style={styles.image} 
        />
      </View>
      <View style={styles.containerChild}>
        <TextInput style={[styles.textInput, styles.text]}
          placeholder='Nome'
          keyboardType='default'
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput style={[styles.textInput, styles.text]}
          placeholder='Senha'
          keyboardType='default'
          secureTextEntry={true}
          value={userSenha}
          onChangeText={setUserSenha}
        />        
        <Pressable style={ styles.button }                                                
            onPress={verifyLogin}
        >
          <Text style={styles.text}>Acessar</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",    
    backgroundColor: "#fff",     
  },
  containerImage: {
    marginBottom: 100,
  }, 
  image: {
    width: 250,
    height: 250,
    backgroundColor: "transparent",
  },
  containerChild:{
    width: '100%',
    justifyContent: "flex-end"
  },
  textInput: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#e6e8e9",
    borderBottomWidth: 1,
    borderBottomColor: "#3e3e3e",
    borderRadius: 5,
  },  
  button: {
    marginHorizontal: 10,
    marginTop: 25,    
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#3e3e3e",
    borderRadius: 5,
    backgroundColor: "#f4a261",
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 20, 
    justifyContentHorizontal: "center",    
  }  
})