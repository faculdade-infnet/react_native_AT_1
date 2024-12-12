import { useState } from 'react';
import { View, Text, Image, TextInput, Pressable } from 'react-native';
import styles from './indexStyle';

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