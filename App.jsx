// #region Imports
import TransacaoListScreen from './screens/TransacaoListScreen';
import TransacaoFormScreen from './screens/TransacaoFormScreen';
import HomeScreen from './screens/LoginScreen';
// import LoginScreen from './screens/LoginScreen'; // Importe a tela de login
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
// #endregion Imports

// Objeto do tipo stack para navegação
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Stack Navigator para controlar a navegação inicial */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tela de Login */}
        <Stack.Screen name="Login" component={HomeScreen} />
        
        {/* Navegação do menu */}
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Navegação com o Drawer (menu)
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name='home' 
        options={{ title: "Home" }}
        component={HomeScreen}
      />
      <Drawer.Screen 
        name='home1' 
        options={{ title: "Home1" }}
        component={HomeScreen}
      />
      <Drawer.Screen 
        name='home2' 
        options={{ title: "Home2" }}
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
}
