import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import sucos from '../assets/sucos.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import sucoLaranja from '../assets/sucoLaranja.png'
import NavBar from '../components/NavBar'


export default function Home() {
    const navigation = useNavigation()
   



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#F6F6F6",
            alignItems: "center",

        },
        abaItens: {
            backgroundColor: "#F6F6F6",
            width: "100%",
            height: "72%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
        },
        caixaItens: {
            width: "100%",
            height: "45%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row"
        },
        itens: {
            display: "flex",
            borderColor: "#D5AB30",
            borderWidth: 1,
            width: "45%",
            height:"100%",
            borderRadius:20,
            alignItems:"center",
            
        },
        imagem: {
            width: "100%",
            height: "20%"
        },
        imagemProduto:{
            width: "100%",
            height: "60%",
            marginBottom:"8%",
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
        },
        textoSuco:{
            fontSize:18,
            fontWeight: "bold",
            marginBottom:"2%"
        },
        textoPreco:{
            fontSize:25,
            color: "#77B725"
        },

    });

    return (

        <View style={styles.container}>
            <NavBar/>
            <Image style={styles.imagem} source={sucos}/>
            <View style={styles.abaItens}>
                <ScrollView></ScrollView>
                
                <View style={styles.caixaItens}>
                    {/* <TouchableOpacity style={styles.itens} onPress={() => navigation.navigate('Transferencia')}>

                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.itens}>
                        <Image style={styles.imagemProduto} source={sucoLaranja}/>
                        <View>
                            <Text style={styles.textoSuco}> Suco De Laranja</Text>
                        </View>

                        <View>
                            <Text style={styles.textoPreco}> R$ 3,50</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.itens}>
                        <Image style={styles.imagemProduto} source={sucoLaranja}/>
                        <View>
                            <Text style={styles.textoSuco}> Suco De Maça</Text>
                        </View>

                        <View>
                            <Text style={styles.textoPreco}> R$ 3,50</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.caixaItens}>

                    <TouchableOpacity style={styles.itens}>
                        <Image style={styles.imagemProduto} source={sucoLaranja}/>
                        <View>
                            <Text style={styles.textoSuco}> Suco De Limão</Text>
                        </View>

                        <View>
                            <Text style={styles.textoPreco}> R$ 3,50</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itens}>
                        <Image style={styles.imagemProduto} source={sucoLaranja}/>
                        <View>
                            <Text style={styles.textoSuco}> Suco De Melencia</Text>
                        </View>

                        <View>
                            <Text style={styles.textoPreco}> R$ 3,50</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>
        </View>

    )
}