import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Feather} from '@expo/vector-icons'
import Login from './pages/Login';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import FreshJuice from './pages/FreshJuice';
import { useEffect } from 'react';


const Pilha = createNativeStackNavigator()
const Nav = createBottomTabNavigator()

function NavBar(){

    return(
        <Nav.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor:'#000',
                    borderTopColor: 'transparent',
                    paddingBottom: 1,
                    paddingTop: 1,
                },
                tabBarActiveTintColor:'#3D8C64',
                tabBarInactiveTintColor: '#555',
            }}
        >
            <Nav.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({size, color})=>(
                        <Feather name="home" size={size} color={color}/>
                    ),
                    unmountOnBlur: true
                }}
            />

            <Nav.Screen name="Login" component={Login}
                options={{
                    // tabBarStyle: {display:'none'},
                    headerShown: false,
                    tabBarIcon: ({size, color})=>(
                        <Feather name="user" size={size} color={color}/>
                    )
                }}
            />
        </Nav.Navigator>
    )
}

export default function Routers(){
    return(
        <NavigationContainer>
            <Pilha.Navigator>
                {/* para deixar o login sem aparecer a navbar, deixar ele em primeiro */}
                <Pilha.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{ title: 'Cadastro', headerShown: false }}
                />
                <Pilha.Screen
                    name="NavBar"
                    component={NavBar}
                    options={{ title: '', headerShown: false }}
                />
                <Pilha.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Login', headerShown: false }}
                />
                <Pilha.Screen
                    name="FreshJuice"
                    component={FreshJuice}
                    options={{ title: 'FreshJuice', headerShown: false }}
                />
                <Pilha.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Home', headerShown: false, unmountOnBlur: true }}
                />
            </Pilha.Navigator>
        </NavigationContainer>
    )
}