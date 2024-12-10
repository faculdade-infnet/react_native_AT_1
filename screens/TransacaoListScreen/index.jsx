import { useEffect, useState } from "react";
import { View, Pressable, Text, StyleSheet, ActivityIndicator, useWindowDimensions } from "react-native";
import TransacaoItemList from "../../components/TransacaoItemList";

// Tela que exibe a lista de produtos
// navigation: Uma do React Navigate pra navegar entre telas
export default function TransacaoListScreen({ navigation }) {  
   const url = "https://react-native-infnet-default-rtdb.firebaseio.com/"
   const resource = "transacoes"

   // Verifica se a tela está no modo landscape
   const {width, height} = useWindowDimensions();
   const isLandscape = width > height;

   const [produtos, setProdutos] = useState([]);
   const [message, setMessage] = useState(null);
   const [isLoading, setLoading] = useState(false);
   const [progress, setProgress] = useState(0);

   // Requisição GET com API, processa dados e atualizar o estado do componente   
   useEffect(() => {
      setLoading(true);
      fetch(`${url}${resource}.json`) // get
          .then(res => res.json())
          .then(prods => {
              const produtosIds = Object.keys(prods);
              const produtos = Object.values(prods);
              const total = produtos.length;
              let progress = 0;
              let listaProdutos = [];
              produtosIds.forEach((id, index) => {
                  listaProdutos.push({ id, ...produtos[index]});  // Monta um objeto combinando os atributos
                  progress = (index + 1) / total;                 // Calcula o progresso, item a item
                  setProgress(progress);                          // Atualiza o progresso  
              });
              setProdutos(listaProdutos);
          })
          .catch(error => setMessage(error.message))
          .finally(setLoading(false));
   }, []);

   // useEffect(() => {
   //      setLandscape(width > height);
   //  }, [width, height]);

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
      navigation.navigate('ProdutoShow', produto);
   }


   return (
      <View style={styles.container}>
         <Text>{isLandscape ? 'Landscape' : 'Portrait'}</Text>
         <Text>{width}</Text>
         <Text>{height}</Text>
         {/* isLoading = true, exibe um indicador de carregamento (ActivityIndicator). */}
         {isLoading && <ActivityIndicator size="large" />}
         {/* isLoading = false e message != null, exibe mensagem. */}
         {!isLoading && message && <Text>{message}</Text>}         
         {/* isLoading = false e produtos>0, exibe lista de produtos
         caso contrário, exibe mensagem "Nenhum produto cadastrado". */}
         {!isLoading ? (
            produtos.length > 0 ? (
               <View style={styles.listContainer}>
               <TransacaoItemList 
                  produtos={produtos} 
                  actionRemove={actionRemove}
                  actionShow={actionShow}/>
               </View>
            ) : (
               <Text>Nenhum produto cadastrado.</Text>
            )
         ) : null}
         <View style={styles.navContainer}>
            <Pressable
               style={styles.navOption}
               onPress={() => {
                  navigation.navigate('ProdutoForm');
               }}
            >
               <Text style={styles.navOptionLabel}>+</Text>
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
   listContainer: {
      flex: 1,
   },
   navContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
   },
   navOption: {
      paddingVertical: 8,
      width: 30,
      backgroundColor: "#8ecae6",
      alignItems: "center",
      borderRadius: 50,
   },
   navOptionLabel: {
      fontSize: 20,
   }
});