import React, { useEffect, useState } from "react";
import { View, Pressable, Text, StyleSheet, ActivityIndicator, useWindowDimensions } from "react-native";
import TransacaoItemList from "../../components/TransacaoItemList";
import IconAdd from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from "@react-navigation/native"; // Importa o hook

// Tela que exibe a lista de produtos
// navigation: Uma do React Navigate pra navegar entre telas
export default function TransacaoListScreen({ navigation }) {  
   const url = "https://react-native-infnet-default-rtdb.firebaseio.com/"
   const resource = "transacoes"

   // Verifica se a tela está no modo landscape
   const {width, height} = useWindowDimensions();
   const isLandscape = width > height;

   const [produtos, setProdutos] = useState([]);
   const [isRefreshing, setRefreshing] = useState(false);
   const [isLoading, setLoading] = useState(false);   
   const [message, setMessage] = useState(null);

   // Requisição GET com API, processa dados e atualizar o estado do componente   
   const fetchProdutos = async () => {
      setLoading(true);
      fetch(`${url}${resource}.json`)
         .then(res => res.json())
         .then(prods => {
            const produtosIds = Object.keys(prods);
            const produtos = Object.values(prods);
            const listaProdutos = produtosIds.map((id, index) => ({
               id, ...produtos[index],
            }));
            setProdutos(listaProdutos);
         })
         .catch(error => setMessage(error.message))
         .finally(
            setLoading(false),
            setRefreshing(false)
         )
   };

   useFocusEffect(
      React.useCallback(() => {
         fetchProdutos();
      }, []) // Apenas recria a função quando as dependências mudarem
   );

   // Remove do firebase com API
   const actionRemove = (produto) => {            
      // Exibe o indicador de carregamento
      setLoading(true); 
      fetch(`${url}${resource}/${produto.id}.json`, {
         method: "DELETE", 
      })
      .then(() => {
         // Remove o item da lista local
         const listaAtualizada = produtos.filter((item) => item.id !== produto.id);
         setProdutos(listaAtualizada); // Atualiza o estado
      })
      .catch((error) => {
         Alert.alert("Erro ao remover produto", error.message);
      })
      .finally(() => setLoading(false)); // Finaliza o carregamento            
   }

  // Cria navegação para tela 'ProdutoShow' e passa o produto selecionado como parâmetro.
   // Define o produto selecionado e muda para a tela de detalhes.
   const actionShow = (produto) => {
      navigation.navigate('TransacaoShowScreen', produto);
   }


   return (
      <View style={styles.container}>                  
         {isLoading && <ActivityIndicator size="large" />}
         {!isLoading ? (
            produtos.length > 0 ? (
               <View style={styles.listContainer}>
                  <TransacaoItemList 
                     produtos={produtos} 
                     actionRemove={actionRemove}
                     actionShow={actionShow}
                     isLandscape={isLandscape}
                  />
               </View>
            ) : (
               <Text>Nenhum produto cadastrado.</Text>
            )
         ) : null}
         <View style={styles.navContainer}>
            <Pressable
               // style={styles.navOption}
               onPress={() => {
                  navigation.navigate('TransacaoForm');
               }}
            >
               <IconAdd name="add" 
                  size={styles.iconeAdd.size} 
                  color={styles.iconeAdd.color}
                  style={styles.iconeAdd}
               />
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      padding: 8,
   },
   iconeAdd: {
      size: 40,
      margin: 10,     
      color: "#686666",         
      
      justifyContent: "center",
      backgroundColor: "#4fc959",
      borderRadius: 50,
   },
   listContainer: {
      flex: 1,
   },
   navContainer: {
      position: "absolute",
      bottom: 10,
      right: 10,
      flexDirection: "row",
      justifyContent: "flex-end",
   },
   navOptionLabel: {
      fontSize: 20,
   }
});