const url = "https://react-native-infnet-default-rtdb.firebaseio.com/"
const transacoes = "transacoes"

const GetFirebase = (produtos, setProdutos, setLoading) => {    
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
  
export default GetFirebase;