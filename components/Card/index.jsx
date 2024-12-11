import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import IconDelete from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEdit from 'react-native-vector-icons/Entypo';


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


const styles = StyleSheet.create({
   icone: {
      size: 40,
      margin: 10,  
   }, 
   iconeDelete: {      
      color: "#c53232",      
   }, 
   btnDelete:{
      width: 60,
      height: 60,
      backgroundColor: "#979797",
      borderRadius: 5,
   },
   iconeEdit: {      
      color: "#0d9e19",      
   }, 
   btnEdit:{
      width: 60,
      height: 60,
      backgroundColor: "#979797",
      borderRadius: 5,
   },
   container: {
      paddingHorizontal: 5,
      paddingVertical: 3,
      borderWidth: 1,
      borderColor: '#8d99ae',
      borderRadius: 5,
   },
   box:{
      flexDirection: 'row',
      gap: 10,
   },
   child: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   cardFooterPotrait: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   cardFooterLandscape: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   title: {
      fontSize: 25,
   },
});