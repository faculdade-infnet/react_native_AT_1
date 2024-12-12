import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import TransacaoListScreen from './screens/TransacaoListScreen';
import TransacaoFormScreen from './screens/TransacaoFormScreen';
import TransacaoShowScreen from './screens/TransacaoShowScreen';

// Objeto do tipo stack para navegação
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>        
        <Stack.Screen name="login" component={LoginScreen} />
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
        name='TransacaoList' 
        options={{ title: "Transações" }}        
      >
        {(props) => <TransacaoListScreen {...props}/>}
      </Drawer.Screen>
      <Drawer.Screen 
        name='TransacaoForm' 
        options={{ title: "Cadastro de Transação" }}
        component={TransacaoFormScreen}
      />
      <Drawer.Screen 
        name='TransacaoShowScreen' 
        options={() => ({
          title: "Transação",
          drawerLabel: () => null,
          drawerItemStyle: { display: 'none' }
        })}
        component={TransacaoShowScreen}
      />
    </Drawer.Navigator>
  );
}
