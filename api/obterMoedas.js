const obterMoedas = async () => {
    try {
      const response = await fetch('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json');
      const data = await response.json();
      const moedas = data.value.map(item => item.simbolo);
      // console.log(moedas);
      return moedas;
    } catch (error) {
      console.error("Erro ao buscar moedas:", error);
      return [];
    }    
  };
  
 export default obterMoedas;
  