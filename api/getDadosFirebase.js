const url = "https://react-native-infnet-default-rtdb.firebaseio.com/"
const transacoes = "transacoes"

const SalvarFirebase = (produtos, setProdutos, setLoading) => {
    const [progress, setProgress] = useState(0);
    setLoading(true);

    fetch(`${url}${transacoes}.json`) // get
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
  };
  
export default SalvarFirebase;