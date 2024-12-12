import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 5,
      paddingVertical: 3,
      borderWidth: 1,
      borderColor: '#8d99ae',
      borderRadius: 5,
      backgroundColor: '#cacfd6',
   },
    icone: {
       size: 40,
       margin: 10,  
    }, 
    iconeDelete: {      
       color: "#c53232",      
    }, 
    btnDelete:{
       width: 60,
       height: 60,
       backgroundColor: "#979797",
       borderRadius: 5,
    },
    iconeEdit: {      
       color: "#0d9e19",      
    }, 
    btnEdit:{
       width: 60,
       height: 60,
       backgroundColor: "#979797",
       borderRadius: 5,
    },
    box:{
       flexDirection: 'row',
       gap: 10,
    },
    child: {
       flexDirection: 'row',
       justifyContent: 'space-between',
    },
    cardFooterPotrait: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
    },
    cardFooterLandscape: {
       flexDirection: 'row',
       justifyContent: 'space-between',
    },
    title: {
       fontSize: 25,
    },
 });

 export default styles;