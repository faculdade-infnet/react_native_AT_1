import { FlatList, View, Text, StyleSheet, Platform, Alert } from 'react-native';
import TransacaoItemList from '../../components/TransacaoItemList';

export default function TransacaoListScreen() {      
    return (
      <View style={styles.container}>
        <Text>TransacaoListScreen</Text>
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",    
    backgroundColor: "#fff",     
  },
})