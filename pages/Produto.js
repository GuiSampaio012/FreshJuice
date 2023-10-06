import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import sucoLaranja from '../assets/sucoLaranja.png'
import NavBar from '../components/NavBar'

export default function Produto() {
    const [unidade, setUnidade] = useState(0)
    const navigation = useNavigation()


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#F6F6F6",
            alignItems: "center",

        },
        abaItem: {
            backgroundColor: "#F6F6F6",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
        },
        caixaItem: {
            width: "100%",
            height: "78%",
            display: "flex",
            flexDirection: "collum",
            alignItems: "center",
            justifyContent: "space-evenly",
        },
        item: {
            borderColor: "#D5AB30",
            borderWidth: 1,
            borderRadius:20,
            display: "flex",
            width: "75%",
            height:"45%",
        },
        descItem: {
            justifyContent: "space-evenly",
            alignItems: "center",
            borderColor: "#D5AB30",
            borderWidth: 1,
            borderRadius:20,
            display: "flex",
            width: "85%",
            height:"45%",
        },
        image: {
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
            width: "100%",
            height: "100%"
        },
        tituloProd:{
            textAlign:'center',
            fontSize:24,

        },
        descProd:{
            fontSize:16,
            
        },
        botao:{
            justifyContent: "center",
            borderRadius:10,
            backgroundColor: "orange",
            width: "35%",
            height: "100%",
        },
        caixaBotaoTitulo:{ 
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
            height: "20%",
        },
        preco:{
            textAlign: "center",
            color: "green",
            fontSize:30
        },
        comprar:{
            fontSize:20,
            color:"white",
            textAlign: "center",
        },
        tamanhoQuantidade:{
            width: "100%",
            height: "11%",
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
        },
        caixaQuantidade:{
            flexDirection: "row",
            alignItems:"center",
            backgroundColor: "green",
            justifyContent: "space-around",
            width: 250,
            height: 50,
            borderRadius:14,
        },
        icones:{
            textAlign: "center",
            fontSize:30,
        },
        quantidade:{
            textAlign: "center",
            color: "white",
            fontSize:25,
        },
        botaoQuantidade:{
            width: 30,
        }

    });

    return (

        <View style={styles.container}>
            <NavBar/>
            
            <View style={styles.abaItem}>
            
                <View style={styles.caixaItem}>

                    <TouchableOpacity style={styles.item}>
                        <Image style={styles.image} source={sucoLaranja}/>
                    </TouchableOpacity>

                    <View style={styles.descItem}>
                        <Text style={styles.tituloProd}> Suco De Laranja</Text>

                        <Text style={styles.descProd}> Nosso suco de laranja é feito por laranjas selecionadas e cultivadas na plantação do Carlinhos </Text>
                        
                        <View style={styles.caixaBotaoTitulo}>
                            <TouchableOpacity style={styles.botao}>
                                <Text style={styles.comprar}>Comprar</Text>

                            </TouchableOpacity>
                            <Text style={styles.preco}> R$ 29,00 </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tamanhoQuantidade}>
                        <View style={styles.caixaQuantidade}>
                            <TouchableOpacity style={styles.botaoQuantidade}>
                                <Text style={styles.icones}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantidade}>{unidade}</Text>

                            <TouchableOpacity style={styles.botaoQuantidade}>
                                <Text style={styles.icones}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

            </View>
        </View>

    )
}