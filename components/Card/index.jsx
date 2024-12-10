import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';

export default function Card({ prod, actionRemove, actionShow }) {
   return (
      <GestureHandlerRootView>
         <ReanimatedSwipeable
            // Obtém o inicio do movimento do swipe(arrastar)
            //onSwipeableOpenStartDrag={()=>Alert.alert('Agir')}               
            // da esquerda para a direita
            renderLeftActions={(_, drag) => {
               const styleAnimation = useAnimatedStyle(() => {
                  return {
                        transform: [{ translateX: drag.value - 100 }]
                  }
               });
               return (
                  <Reanimated.View style={[
                        styleAnimation,
                        { flexDirection: 'row' }
                  ]}
                  >
                        <Pressable style={{
                           width: 50,
                           height: 50,
                           backgroundColor: "#f4a261",
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}
                           onPress={() => actionRemove(prod)}
                        >
                           <Text>Excluir</Text>
                        </Pressable>
                        <Pressable style={{
                           width: 50,
                           height: 50,
                           backgroundColor: "#219ebc",
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}>
                           <Text>Editar</Text>
                        </Pressable>
                  </Reanimated.View>
               );
            }}
            renderRightActions={(_, drag) => {
               const styleAnimation = useAnimatedStyle(() => {
                  return {
                        transform: [{ translateX: drag.value + 50 }]
                  }
               });
               return (
                  <Reanimated.View style={[styleAnimation, { flexDirection: 'row'}]}>
                        <Pressable
                           style={{
                              width: 50,
                              height: 50,
                              backgroundColor: "#2a9d8f"
                           }}
                           onPress={() => actionShow(prod)}
                           >
                              <Text>Exibir</Text>
                           </Pressable>
                  </Reanimated.View>
               );
            }}
         >
            <View style={styles.container}>
               {/* {Platform.OS == 'web' ? <Text>Web</Text> : <Text>Android</Text>} */}
               <View style={styles.cardHeader}>
                  <Text style={styles.cardTextH3}>{prod.categoria}</Text>
                  <Text style={styles.cardTextH4}>R$ {prod.cotacao}</Text>
                  <Text style={styles.cardTextH4}>R$ {prod.data}</Text>
                  <Text style={styles.cardTextH3}>{prod.descricao}</Text>
                  <Text style={styles.cardTextH4}>R$ {prod.moeda}</Text>
                  <Text style={styles.cardTextH4}>R$ {prod.preco}</Text>
                  <Text style={styles.cardTextH4}>R$ {prod.time}</Text>
                  <Text style={styles.cardTextH4}>R$ {prod.tipo}</Text>
               </View>
               <View style={styles.cardFooter}>
                  <Text>{prod.local}</Text>
                  <Text>{prod.data}</Text>
               </View>
            </View>
         </ReanimatedSwipeable>
      </GestureHandlerRootView>
   );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        // marginVertical: 2,
        // border: '1px solid black',
        borderWidth: 1,
        borderColor: '#8d99ae',
        borderRadius: 5,
        // marginTop: Platform.OS == 'android' ? 100 : 
        //             Platform.OS == 'ios' ? 150 : 200,
        ...Platform.select({
            // android: { marginTop: 10 },
            // ios: { marginTop: 15 },
            // web: { marginTop: 20 },
        })
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTextH3: {
        fontSize: 18,
    },
    cardTextH4: {
        fontSize: 16,
    }
});

// export styles;
// import { styles } from "arquivo.js";