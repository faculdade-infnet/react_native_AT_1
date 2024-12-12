import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: "center",
     justifyContent: "center",    
     backgroundColor: "#fff",     
   },
   containerImage: {
     marginBottom: 100,
   }, 
   image: {
     width: 250,
     height: 250,
     backgroundColor: "transparent",
   },
   containerChild:{
     width: '100%',
     justifyContent: "flex-end"
   },
   textInput: {
     padding: 10,
     marginHorizontal: 10,
     marginVertical: 5,
     backgroundColor: "#e6e8e9",
     borderBottomWidth: 1,
     borderBottomColor: "#3e3e3e",
     borderRadius: 5,
   },  
   button: {
     marginHorizontal: 10,
     marginTop: 25,    
     height: 50,
     borderBottomWidth: 1,
     borderBottomColor: "#3e3e3e",
     borderRadius: 5,
     backgroundColor: "#f4a261",
     justifyContent: 'center',
     alignItems: 'center',
   },
   text:{
     fontSize: 20, 
     justifyContentHorizontal: "center",    
   }  
 })

 export default styles;