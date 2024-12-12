import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      padding: 8,
   },
   textInput: {
      padding: 10,      
      marginVertical: 5,
      backgroundColor: "#e6e8e9",
      borderWidth: 1,
      borderColor: '#8d99ae',
      borderRadius: 5,
    }, 
   picker:{
      backgroundColor: "#e6e8e9",
      marginVertical: 5,
      borderWidth: 1,
      borderColor: '#8d99ae',
      borderRadius: 5,
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
});

export default styles;