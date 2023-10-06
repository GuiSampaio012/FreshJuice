import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons'
import Login from './pages/Login';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import FreshJuice from './pages/FreshJuice';
import Produto from './pages/Produto';


const Pilha = createNativeStackNavigator()
const Nav = createBottomTabNavigator()

function NavBar2() {
    

    return (
        <Nav.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#4F771C',
                    borderTopColor: 'transparent',
                    paddingBottom: 1,
                    paddingTop: 1,
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#fff',
            }}
        >
            <Nav.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="home" size={size} color={'#fff'} />
                    ),
                    unmountOnBlur: true
                }}
            />

            <Nav.Screen name="Compras" component={Produto}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="shopping-cart" size={size} color={'#fff'} />
                    ),
                    unmountOnBlur: true
                }}
            />

        </Nav.Navigator>
    )
}

export default function Routers() {
    return (
        <NavigationContainer>
            <Pilha.Navigator>
                <Pilha.Screen
                    name="FreshJuice"
                    component={FreshJuice}
                    options={{ title: 'FreshJuice', headerShown: false }}
                />
                <Pilha.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Login', headerShown: false }}
                />
                <Pilha.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{ title: 'Cadastro', headerShown: false }}
                />
                {/* para deixar o login sem aparecer a navbar, deixar ele em primeiro */}
                 <Pilha.Screen
                    name="TabBar"
                    component={NavBar2}
                    options={{ title: '', headerShown: false }}
                />
                
                <Pilha.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Home', headerShown: false, unmountOnBlur: true }}
                />
                
                <Pilha.Screen
                    name="Produto"
                    component={Produto}
                    options={{ title: 'Produto', headerShown: false, unmountOnBlur: true }}
                />


            </Pilha.Navigator>
        </NavigationContainer>
    )
}