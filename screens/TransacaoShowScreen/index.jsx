import { View, Text, Alert, StyleSheet } from 'react-native';
// import styles from './indexStyle';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

// Tela que exibe os detalhes
export default function TransacaoShowScreen({ route }) {
   // route.params = é um objeto(produto) com os parâmetros passados na navegação
   const { descricao, preco, categoria, moeda, data, time } = route.params;


   return (
      <View>
         <Text>{descricao}</Text>
         <Text>R$ {preco}</Text>
         <Text>{categoria}</Text>
         <Text>{moeda}</Text>
         <Text>{data}</Text>
         <Text>{time}</Text>
      </View>      
   );
}

const styles = StyleSheet.create({
   animatedBoxTap: {
      flex: 1,
      backgroundColor: 'red',   
   },
})