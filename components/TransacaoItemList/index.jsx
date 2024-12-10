import { FlatList, StyleSheet, Platform } from 'react-native';
import Card from '../Card';

export default function TransacaoItemList({ produtos, actionRemove, actionShow }) {      
  const createItemView = ({ item }) => (
    <Card 
       prod={item}
       actionRemove={actionRemove}
       actionShow={actionShow}
    />
 );

 return (
    <FlatList
       data={produtos}                  // Array de produtos
       renderItem={createItemView}      // Função que renderiza cada item
       keyExtractor={(item) => item.id} // Gera a chave única para cada item
    />
 );
}

const styles = StyleSheet.create({
 pressableContainer: {
    // paddingHorizontal: 5,
    // paddingVertical: 3,
    // marginVertical: 2,      
    borderRadius: 5,
    ...Platform.select({
       android: { marginTop: 10 },
       ios: { marginTop: 15 },
       web: { marginTop: 20 },
    })
 },
});