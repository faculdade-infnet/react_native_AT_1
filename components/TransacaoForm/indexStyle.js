import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {   
        height: '100%',      
        justifyContent: "center",    
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    box:{         
        marginVertical: 5,
        backgroundColor: "#e6e8e9",
        borderBottomWidth: 1,
        borderBottomColor: "#3e3e3e",
        borderRadius: 5
    },
    containerTime:{
        flexDirection: "row",
        justifyContent: 'space-between', 
        alignItems: "center",
        paddingRight:10,  
    },
    containerSwitch:{
        flexDirection: "row",
        justifyContent: 'space-between', 
        alignItems: "center",
        paddingHorizontal: 10,                  
    }, 
    switch: {
        flexDirection: "row",
        alignItems: "center",    
        marginVertical: 5,
    }, 
    pressableTime: {  
        flexDirection: "row",    
        marginRight: 10,
        paddingRight: 10,
        marginVertical: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e8e9',  
    },
    pressedTime: {
        backgroundColor: '#3e3e3e',    
    },
    notPressedTime: {
        // backgroundColor: '#e6e8e9',  
    },
    containerImage: {
        marginBottom: 100,
    }, 
    icone: {
        size: 40, 
        color: "#000",
        margin: 10,  
    },    
    textInput: {        
        padding: 10,          
    },  
    button: {   
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    text:{
        fontSize: 20, 
    }  
})

export default styles;