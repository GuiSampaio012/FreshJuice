import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'
import Suco from '../assets/sucoLaranja.png'




export default function Produto({route}) {
    const { item,image } = route.params;
    const [unidade, setUnidade] = useState(0)
    const navigation = useNavigation()


    async function comprar (){
        var carrinho = []
        const produto = {nome: item.nome,descricao:item.descricao,litros:item.litros,preco:item.preco,imagem:image,quantidade:unidade}
        console.log(produto);

        if (await AsyncStorage.getItem("carrinho")) {
            carrinho = JSON.parse(await AsyncStorage.getItem("carrinho"))
            carrinho.push(produto)
            await AsyncStorage.setItem("carrinho", JSON.stringify(carrinho))
        }
        else{
            carrinho.push(produto)
            await AsyncStorage.setItem("carrinho", JSON.stringify(carrinho))
        }
        
    }





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
            width: "100%",
            height: "100%",
            borderRadius:20,
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
            {
                item?
                <>
                <View style={styles.caixaItem}>

                    <TouchableOpacity style={styles.item}>
                        <Image style={styles.image} source={{uri:image}}/>
                    </TouchableOpacity>

                    <View style={styles.descItem}>
                        <Text style={styles.tituloProd}> {item.nome}</Text>

                        <Text style={styles.descProd}>{item.descricao}</Text>
                        
                        <View style={styles.caixaBotaoTitulo}>
                            <TouchableOpacity style={styles.botao} onPress={()=> unidade>0?comprar():alert("adicione uma unidade")}>
                                <Text style={styles.comprar}>Comprar</Text>

                            </TouchableOpacity>
                            <Text style={styles.preco}> R$ {item.preco} </Text>
                        </View>
                    </View>
                </View>
                    <View style={styles.tamanhoQuantidade}>
                        <View style={styles.caixaQuantidade}>
                            <TouchableOpacity style={styles.botaoQuantidade} onPress={()=> unidade<=0? setUnidade(0):setUnidade(unidade-1)}>
                                <Text style={styles.icones}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantidade}>{unidade}</Text>

                            <TouchableOpacity style={styles.botaoQuantidade} onPress={()=> setUnidade(unidade+1)}>
                                <Text style={styles.icones}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                
                
                </>
                :
                <>
                <View style={styles.caixaItem}>

                <TouchableOpacity style={styles.item}>
                    <Image style={styles.image} />
                </TouchableOpacity>

                <View style={styles.descItem}>
                    <Text style={styles.tituloProd}> {item.nome}</Text>

                    <Text style={styles.descProd}>{item.descricao}</Text>
                    
                    <View style={styles.caixaBotaoTitulo}>
                        <TouchableOpacity style={styles.botao} onPress={()=> unidade>0?comprar():alert("adicione uma unidade")}>
                            <Text style={styles.comprar}>Comprar</Text>

                        </TouchableOpacity>
                        <Text style={styles.preco}> R$ ---- </Text>
                    </View>
                </View>
            </View>
                <View style={styles.tamanhoQuantidade}>
                    <View style={styles.caixaQuantidade}>
                        <TouchableOpacity style={styles.botaoQuantidade} onPress={()=> unidade<=0? setUnidade(0):setUnidade(unidade-1)}>
                            <Text style={styles.icones}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.quantidade}>{unidade}</Text>

                        <TouchableOpacity style={styles.botaoQuantidade} onPress={()=> setUnidade(unidade+1)}>
                            <Text style={styles.icones}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            
            }
                

            </View>
        </View>

    )
}