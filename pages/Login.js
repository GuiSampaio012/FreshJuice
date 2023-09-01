import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
// import styles from './styles'
// import axios from 'axios'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'
import {app } from './firebaseConfig'
import jarra from '../assets/jarra.png'
import bacia from '../assets/bacia.png'
// import Navbar from '../components/Navbar'

export default function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigation = useNavigation()
    const auth = getAuth(app);

    const btLogin = () => {
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("green");
                navigation.navigate('Home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });    
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#FCFFEA",
            alignItems: "center",
            justifyContent: "center",
        },
        caixaLogin: {
            borderColor: "#EFBA00",
            borderWidth: 1,
            paddingVertical: 10,
            borderRadius: 30,
            backgroundColor: "#F6F6F6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "50%",
            width: "85%",
            marginTop:"10%"
        },
        entrada: {
            paddingLeft: 10,
            backgroundColor: "#FFF",
            width: "65%",
            height: 45,
            borderWidth:1,
            borderRadius: 10,
            //marginBottom: "6%",
        },
        texto: {
            fontSize: 40,
            //marginBottom: "8%"
        },
        textoBtn: {
            fontSize: 20,
            fontWeight: "bold",
        },
        botaoVoltar: {
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            width: "13%",
            height: "5%",
            backgroundColor: "green",
            borderRadius: "35%",
            marginBottom: "8%",
            marginTop: "3%"
        },
        botao: {
            marginTop: "10%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            width: "45%",
            height: 40,
            backgroundColor: "#D5AB30",
            borderRadius: 10,
        },
        imagemCamera: {
            width: 50,
            height: 45,
        },
        caixaImagens: {
            marginTop: "4%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        caixaBtn: {
            width: "70%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
        },
    });


    return (
        <View style={styles.container}>

            <View style={styles.caixaLogin}>
                <Text style={styles.texto}> LOGIN </Text>

                <TextInput
                    style={styles.entrada}
                    placeholder='usuario'
                    keyboardType='text'
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                />

                <TextInput
                    secureTextEntry={true}
                    style={styles.entrada}
                    placeholder='password'
                    keyboardType='text'
                    
                    value={senha}
                    onChangeText={(e) => setSenha(e)}
                />

                <View style={styles.caixaBtn}>
                    <TouchableOpacity 
                        style={styles.botao}
                        onPress={() => btLogin()}
                    >
                        <Text style={styles.textoBtn}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={()=>navigation.navigate("FreshJuice")}
                    >
                    <Text style={styles.textoBtn}>Voltar</Text>
                    </TouchableOpacity>
                </View>
    
            </View>
            <View style={styles.caixaImagens}>
            <Image source={jarra}/>
            <Image source={bacia}/>
                {/* <img src={jarra} />
                <img src={bacia} /> */}
            </View>
        </View>
    )
}