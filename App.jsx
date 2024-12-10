// #region Imports
import TransacaoListScreen from './screens/TransacaoListScreen';
import TransacaoFormScreen from './screens/TransacaoFormScreen';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// #endregion Imports

// Objeto do tipo stack para navegação
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>        
        {/* <Stack.Screen  name='transacaoForm' 
                       options={{ title: "Cadstro de Transação" }}
                       component={TransacaoFormScreen} /> */}
        <Drawer.Screen 
          name='transacaoList' 
          options={{ title: "Transasções" }}          
        >
          {(props) => <TransacaoListScreen {...props}/>}
        </Drawer.Screen>
        {/* <Stack.Screen name="login" component={LoginScreen} /> */}
        <Stack.Screen name="home" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Navegação com o Drawer (menu)
function DrawerNavigator() {
  return (
    <Drawer.Navigator>      
      <Drawer.Screen 
        name='transacaoList' 
        options={{ title: "ransasções" }}
        component={TransacaoListScreen}
      />
      <Drawer.Screen 
        name='transacaoForm' 
        options={{ title: "Cadastro de Transação" }}
        component={TransacaoFormScreen}
      />
    </Drawer.Navigator>
  );
}
