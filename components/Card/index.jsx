import { View, Text } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import IconDelete from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEdit from 'react-native-vector-icons/Entypo';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import styles from './indexStyle';

export default function Card({ prod, actionRemove, actionShow, isLandscape }) {
   return (
      <GestureHandlerRootView>
         <ReanimatedSwipeable
            renderLeftActions={(_, drag) => {
               const styleAnimation = useAnimatedStyle(() => {
                  return {
                        transform: [{ translateX: drag.value - 60 }]
                  }
               });
               return (
                  <Reanimated.View style={[ styleAnimation, { flexDirection: 'row' }]}>
                        <Pressable style={styles.btnDelete}
                           onPress={() => actionRemove(prod)}
                        >
                           <IconDelete name="delete" 
                              size={styles.icone.size} 
                              color={styles.iconeDelete.color}
                              style={styles.icone}
                           />
                        </Pressable>                        
                  </Reanimated.View>
               );
            }}
            renderRightActions={(_, drag) => {
               const styleAnimation = useAnimatedStyle(() => {
                  return {
                        transform: [{ translateX: drag.value + 60 }]
                  }
               });
               return (
                  <Reanimated.View style={[styleAnimation, { flexDirection: 'row'}]}>
                     <Pressable
                        style={styles.btnEdit}
                        onPress={() => actionShow(prod)}
                     >
                        <IconEdit name="edit" 
                           size={styles.icone.size} 
                           color={styles.iconeEdit.color}
                           style={styles.icone}
                        />
                     </Pressable>
                  </Reanimated.View>
               );
            }}
         >
            <View style={styles.container}>
               {!isLandscape ? (
                  <>
                     <View style={styles.child}>
                        <Text style={styles.title}>{prod.descricao}</Text>                        
                        <Text style={styles.title}>R$ {prod.valor}</Text>
                     </View>
                     <View style={styles.cardFooterPotrait}>
                        <Text>{prod.date}</Text>
                     </View>
                  </>
               ) : (
                  <>
                     <View style={styles.child}>
                        <Text style={styles.title}>{prod.descricao}</Text>                                                
                        <View style={styles.box}>
                           <Text style={styles.title}>{prod.moeda} -</Text>
                           <Text style={styles.title}>R$ {prod.valor}</Text>
                        </View>
                     </View>
                     <View style={styles.cardFooterLandscape}>
                        <View style={styles.box}>
                           <Text>Data: {prod.date}</Text>
                           <Text>Horário: {prod.time}</Text>
                        </View>
                        <Text>{prod.categoria}</Text>
                     </View>
                  </>
               )}
            </View>
         </ReanimatedSwipeable>
      </GestureHandlerRootView>
   );
}