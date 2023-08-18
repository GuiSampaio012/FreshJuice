import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native'
// import styles from './styles'
// import axios from 'axios'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'


export default function Login() {
    
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigation = useNavigation()
    const auth = getAuth();
    const btCadastro = () => {
        navigation.navigate('Cadastro')
    }

    const btLogin = () => {
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    // const logar = () => {
    //     // essa funcão LOGA
    //     axios.post('http://127.0.0.1:8000/auth/jwt/create', {
    //       email: login,
    //       password: senha
    //     }).then((res) =>{ 
    //         localStorage.setItem('dados',JSON.stringify(res.data))
    //         navigation.navigate('NavBar')
    //         // setLogado(true)
    //     })
    //     console.log(login)
    //     console.log(senha)
    //     console.log('function logar:');
    // }
    
    
    // const refresh = () => {
    //     const token = JSON.parse(localStorage.getItem('dados'))
    //     axios.post('http://127.0.0.1:8000/auth/jwt/refresh', {
    //       refresh: token.refresh
    //     }).then(res => localStorage.setItem('dados', JSON.stringify({...token, access: res.data.access})))
    
    // }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        caixaLogin:{
            
        },
        img:{
            
        },
        caixa:{
            
        },
        entrada:{
            
        },
        grupoBotoes:{
        
        },
        texto:{
           
        },
        botao:{
            
        }
    });


    return (
        <View style={styles.container}>

            <View style={styles.caixaLogin}>
                <View>
                    <img style={styles.img} src={nada}/>
                </View>
                <View style={styles.caixa}>
                    <TextInput
                        style={styles.entrada}
                        placeholder='usuario'
                        keyboardType='email'
                        value={login}
                        onChangeText={(e) => setLogin(e)}
                    />
                </View>

                <View style={styles.caixa}>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.entrada}
                        placeholder='password'
                        keyboardType='text'
                        value={senha}
                        onChangeText={(e) => setSenha(e)}
                    />
                </View>

                <View style={styles.grupoBotoes}>  
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={()=>logar()}
                    >
                        <Text style={styles.texto}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao}
                        onPress={()=>btLogin()}
                    >
                        <Text style={styles.texto}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}