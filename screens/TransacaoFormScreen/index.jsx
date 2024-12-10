import { useEffect, useState } from "react";
import TransacaoForm from "../../components/TransacaoForm";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native"
import obterMoedas from '../../api/obterMoedas';
import listaCategorias from '../../data/categorias';
import SalvarFirebase  from '../../api/salvarFirebase';

export default function TransacaoFormScreen() {
    const [isLoading, setLoading] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [listaMoedas, setListaMoedas] = useState([]); 
    
    // Função para carregar as moedas
    const carregarMoedas = async () => {
        try {
        const simbolos = await obterMoedas();  // Chama a função obterMoedas para pegar os símbolos
        if (Array.isArray(simbolos)) {
            setListaMoedas(simbolos); // Atualiza o estado com os símbolos das moedas
        } else {
            console.error("Erro: A resposta das moedas não é um array.");
        }
        } catch (error) {
        console.error("Erro ao carregar as moedas:", error);
        }
    };    

    // Obter cotação em uma data específica  
    const getCotacao = async (date, moeda) => {
        try {
            const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${moeda}'&@dataCotacao='${date}'&$top=1&$format=json`);
            const data = await response.json();
            
            console.log("teste 01");
            console.log("teste", data);
            // Verificar se a resposta contém o valor esperado
            if (data.value && data.value.length > 0) {
                const cotacaoObtida = data.value[0]?.cotacaoCompra;  // ou 'cotacaoVenda'              
                return cotacaoObtida;
            } else {        
                return null; // Retornar null se não encontrar a cotação
            }
        } catch (error) {
            console.error("Erro ao buscar cotação:", error);
            return null; // Retornar null em caso de erro
        }
    };

    // Funçã para salvar no banco dados
    const onSubmit = async (novoItem) => {                  
        const cotacaoObtida = await getCotacao(novoItem.date, novoItem.moeda);

        if (cotacaoObtida) {
            novoItem.cotacao = cotacaoObtida;
            const precoConvertido = parseFloat((novoItem.valor * cotacaoObtida).toFixed(2));        
            novoItem.preco = precoConvertido;            
            SalvarFirebase(novoItem, produtos, setProdutos, setLoading);
            console.log("11");            
        } else {
            alert("Erro: Cotação não encontrada, selecione uma data válida / Falha na conecção");
        }            
    }

    useEffect(() => {    
        carregarMoedas();
    }, []);

    return (
        <View >
            <TransacaoForm 
                onSubmit={onSubmit}
                listaMoedas={listaMoedas}
                listaCategorias={listaCategorias}/>
            {isLoading && <ActivityIndicator size={"large"} />}
        </View>
    )
}