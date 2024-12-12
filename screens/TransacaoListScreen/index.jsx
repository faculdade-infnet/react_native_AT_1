import React, { useEffect, useState } from "react";
import { View, Pressable, Button, Text, TextInput, alert, ActivityIndicator, useWindowDimensions } from "react-native";
import IconAdd from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from "@react-navigation/native"; // Importa o hook
import { Picker } from '@react-native-picker/picker';
import styles from './indexStyle';
import TransacaoItemList from "../../components/TransacaoItemList";


// Tela que exibe a lista de produtos
// navigation: Uma do React Navigate pra navegar entre telas
export default function TransacaoListScreen({ navigation }) {  
   const url = "https://react-native-infnet-default-rtdb.firebaseio.com/"
   const resource = "transacoes"
   
   // Verifica se a tela está no modo landscape
   const {width, height} = useWindowDimensions();
   const isLandscape = width > height;
   
   const [filtro, setFiltro] = useState('');
   const [ordenacao, setOrdenacao] = useState('');   
   const [produtosFiltrados, setProdutosFiltrados] = useState([]);
   const [produtos, setProdutos] = useState([]);
   const [isRefreshing, setRefreshing] = useState(false);
   const [isLoading, setLoading] = useState(false);   
   const [message, setMessage] = useState(null); 

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
      // Recria a função quando as dependências mudarem
      React.useCallback(() => {
         fetchProdutos();
      }, [])
   );

   // Filtra a lista de produtos com base no que foi digitado no filtro
   const aplicarFiltroEOrdenar = () => {       
      const filtrados = produtos.filter((produto) =>
         produto.descricao.toLowerCase().includes(filtro.toLowerCase())
      );
      // Ordena os produtos filtrados
      const produtosOrdenados = [...filtrados].sort((a, b) => {
         if (ordenacao === 'descricaoCrescente') {
            return a.descricao.localeCompare(b.descricao); 
         } else if (ordenacao === 'descricaoDecrescente') {
            return b.descricao.localeCompare(a.descricao);        
         } else if (ordenacao === 'valorCrescente') {
            return a.valor - b.valor;
         } else if (ordenacao === 'valorDecrescente') {
            return b.valor - a.valor;
         }
      });

      setProdutosFiltrados(produtosOrdenados);
   };

   useEffect(() => {
      if (produtos.length > 0) {
         aplicarFiltroEOrdenar();
      }
   }, [produtos, filtro, ordenacao]);

   return (
      <View style={styles.container}>                  
         {isLoading && <ActivityIndicator size="large" />}
         {!isLoading ? (
            produtos.length > 0 ? (
               <View style={styles.listContainer}>                  
                  <TextInput
                     style={styles.textInput}
                     placeholder="Digite para filtrar por descrição"
                     value={filtro}
                     onChangeText={(text) => setFiltro(text)}
                  />                                    
                  <View style={styles.picker}>
                     <Picker 
                        selectedValue={ordenacao}
                        onValueChange={(itemValue) => setOrdenacao(itemValue)}
                     >
                        <Picker.Item label="Selecione uma ordenação:" value="" enabled={false} />
                        <Picker.Item label="Descricão (Crescente)" value="descricaoCrescente" />
                        <Picker.Item label="Descricão (Decrescente)" value="descricaoDecrescente" />
                        <Picker.Item label="Valor (Crescente)" value="valorCrescente" />
                        <Picker.Item label="Valor (Decrescente)" value="valorDecrescente" />
                     </Picker>
                  </View>
                  <TransacaoItemList 
                     produtos={produtosFiltrados} 
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