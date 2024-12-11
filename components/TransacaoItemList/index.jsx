import { FlatList, StyleSheet, Platform } from 'react-native';
import Card from '../Card';

export default function TransacaoItemList({ produtos, actionRemove, actionShow, isLandscape }) {      
  const createItemView = ({ item }) => (
    <Card 
       prod={item}
       actionRemove={actionRemove}
       actionShow={actionShow}
       isLandscape={isLandscape}
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