import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'
import sucoLaranja from '../assets/sucoLaranja.png'
import { ScrollView } from 'react-native'



export default function Carrinho() {
    const [unidade, setUnidade] = useState(0)
    const [valorTotal, setValorTotal] = useState(1)
    const navigation = useNavigation()


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
        },
        caixaItens: {
            //backgroundColor: "blue",
            paddingVertical: 5,
            width: "98%",
            display: "flex",
            flexDirection: "collum",
        },
        item: {
            marginVertical: 10,
            borderColor: "#D5AB30",
            borderWidth: 2,
            borderRadius: 20,
            display: "flex",
            width: "100%",
            height: 140,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
        },
        image: {
            width: "100%",
            height: "100%"
        },
        tituloProd: {
            textAlign: 'center',
            fontSize: 17,
        },
        botao: {
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: "#F45F02",
            width: "86%",
            height: "32%",
        },
        caixaBotaoTitulo: {
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
            height: "20%",
        },
        preco: {
            textAlign: "center",
            color: "green",
            fontWeight: "bold",
            fontSize: 22
        },
        remover: {
            fontSize: 15,
            color: "white",
            textAlign: "center",
        },
        tamanhoQuantidade: {
            width: "100%",
            height: "11%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        caixaQuantidade: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "green",
            justifyContent: "space-around",
            width: 120,
            height: 30,
            borderRadius: 14,
        },
        icones: {
            textAlign: "center",
            fontSize: 20,
        },
        quantidade: {
            textAlign: "center",
            color: "white",
            fontSize: 20,
        },
        botaoQuantidade: {
            width: 20,
        },
        caixaImage: {
            borderWidth: 1.5,
            borderColor: "#D5AB30",
            borderRadius: 20,
            width: "30%",
            height: "70%",
        },
        adm1: {
            flexDirection: "column",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-around",
        },
        adm2: {
            flexDirection: "column",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-around",
        },
        botaoComprar: {
            justifyContent: "center",
            borderRadius: 15,
            width: "35%",
            height: 50,
            backgroundColor: "green",
        },
        botaoApagarTudo: {
            justifyContent: "center",
            borderRadius: 15,
            width: "35%",
            height: 50,
            backgroundColor: "#D5AB30",
        },
        concluirCompra:{
            height: "13%",
            width: "98%",
            display: "flex",
            flexDirection: "collum",
            alignItems: "center",
        },
        valores:{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
        },
        ultimosBotoes:{
            //backgroundColor: "yellow",
            marginTop: 5,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
        },
        textVT:{
            fontSize: 20,
        },
        textVT2:{
            textAlign: "center",
            color: "green",
            fontWeight: "bold",
            fontSize: 22
        }
    });

    return (

        <View style={styles.container}>
            <NavBar/>
            <ScrollView style={styles.caixaItens}>
                <View style={styles.item}>
                    <View style={styles.caixaImage}>
                        <Image style={styles.image} source={sucoLaranja} />
                    </View>

                    <View style={styles.adm1}>
                        <Text style={styles.tituloProd}> Suco De Laranja</Text>
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

                    <View style={styles.adm2}>
                        <TouchableOpacity style={styles.botao}>
                            <Text style={styles.remover}>Remover</Text>

                        </TouchableOpacity>
                        <Text style={styles.preco}> R$ 29,00 </Text>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.concluirCompra}>
                <View style={styles.valores}>
                    <Text style={styles.textVT}>Valor total</Text>
                    <Text style={styles.textVT2}>R$ {valorTotal}</Text>
                </View>
                <View style={styles.ultimosBotoes}>
                    <TouchableOpacity style={styles.botaoComprar}>
                        <Text style={styles.remover}>Comprar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botaoApagarTudo}>
                        <Text style={styles.remover}>Apagar carrinho</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
}