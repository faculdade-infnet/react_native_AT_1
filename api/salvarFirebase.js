const url = "https://react-native-infnet-default-rtdb.firebaseio.com/"
const transacoes = "transacoes"

const SalvarFirebase = (novoItem, produtos, setProdutos, setLoading) => {
    setLoading(true);

    fetch(`${url}${transacoes}.json`, {
      method: "POST",
      body: JSON.stringify(novoItem),
    })
    .then(async (resp) => {
      const id = await resp.json();
      const novoItemComId = { ...novoItem, id: id.name };
      const listaProdutos = [...produtos, novoItemComId];
      setProdutos(listaProdutos);
      alert("Transação cadastrada com sucesso!");
    })
    .catch((error) => {
      Alert.alert(error.message);
    })
    .finally(() => setLoading(false));
  };
  
export default SalvarFirebase;