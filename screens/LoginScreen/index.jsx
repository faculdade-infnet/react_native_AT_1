import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function HomeScreen() {   
  
  return (    
    <View style={styles.container}>
      <Text>Login</Text>      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})