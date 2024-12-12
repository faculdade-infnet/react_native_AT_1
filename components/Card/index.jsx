import { View, Text, Animated } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import IconDelete from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEdit from 'react-native-vector-icons/Entypo';
import { Swipeable, RectButton } from 'react-native-gesture-handler'
import styles from './indexStyle';

export function DragLeft({drag, onPress}){
   const translate = drag.interpolate({ 
      inputRange:[ 0, 100 ], 
      outputRange:[ 0, 20 ]
   });   

   return(
      <RectButton style={styles.btnDelete} onPress={onPress}>  
        <Animated.View style={{ transform: [{ translateX: translate }] }}>
          <IconDelete name="delete" 
            size={styles.icone.size} 
            color={styles.iconeDelete.color}
            style={styles.iconeDelete}
          />                        
        </Animated.View>
      </RectButton>
    )
}

export function DragRight({drag, onPress}){
   const translate = drag.interpolate({ 
      inputRange:[ 0, 100 ], 
      outputRange:[ 0, 20 ]
   });   

   return(
      <RectButton style={styles.btnEdit} onPress={onPress}>  
        <Animated.View style={{ transform: [{ translateX: translate }] }}>
          <IconEdit name="edit" 
            size={styles.icone.size} 
            color={styles.iconeEdit.color}
            style={styles.iconeEdit}
          />                        
        </Animated.View>
      </RectButton>
    )
}

export default function Card({ prod, actionRemove, actionShow, isLandscape }) {       
   return (
      <GestureHandlerRootView>
         <Swipeable
            renderLeftActions={(_, drag) => (
               <DragLeft drag={drag} onPress={() => actionRemove(prod)}
               />
            )}
            renderRightActions={(_, drag) => (
               <DragRight drag={drag} onPress={() => actionShow(prod)}
               />
            )}
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
         </Swipeable>
      </GestureHandlerRootView>
   );
}