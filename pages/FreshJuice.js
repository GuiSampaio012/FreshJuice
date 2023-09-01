import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity,StyleSheet,Image} from 'react-native'
import logo from '../assets/logoJuice.png'
import { useNavigation } from '@react-navigation/native'


export default function FreshJuice() {
    const navigate = useNavigation();
    const styles = StyleSheet.create({
        fundo:{
            flex: 1,
            backgroundColor: "#FCFFEA",
            alignItems: "center",
            justifyContent: "center",
        },
        texto:{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
        },
        botao:{
            backgroundColor: "#77B725",
            width:120,
            borderRadius:10,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:5
        },
        botao:{
            backgroundColor: "#77B725",
            width:120,
            borderRadius:10,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:5
        },
        logo:{
            width:350,
        },
        grupoBotoes:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-around",
            alignItems:"center",
            width:"100%",
            height:"10%",
        }
        
    })

    return(
        <View style={styles.fundo}>
            {/* <img src={logo} style={styles.logo}/> */}
            <Image source={logo}/>

            <View style={styles.grupoBotoes}>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={()=>{navigate.navigate('Login')}}
                >
                    <Text style={styles.texto}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao}
                    onPress={()=>{navigate.navigate('Cadastro')}}
                >
                    <Text style={styles.texto}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}


