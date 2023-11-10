import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import sucos from '../assets/sucos.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import sucoLaranja from '../assets/sucoLaranja.png'
import { collection, where, getDocs,getFirestore, Firestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app, storage} from '../pages/firebaseConfig';
import NavBar from '../components/NavBar'


export default function Home() {
    const navigation = useNavigation()
    const [produtos,setProdutos] = useState()
    const [imageUrls, setImageUrls] = useState([]);
    

    const db = getFirestore(app)


    useEffect(()=>{
        pegarProdutos()
    },[])

    const pegarProdutos = async() =>{
        let listaProdutos = []
        let listacomImages = []
        var listaUrl = []
        const querySnapshot = await getDocs(collection(db, "produtos"));
        querySnapshot.forEach((doc) => {
        listaProdutos.push(doc.data())
        listacomImages.push(doc.data().foto)
  
        })

        for (let index = 0; index < listacomImages.length; index++) {
            const reference = ref(storage,"produtos/"+listacomImages[index]+".png") 
            const URL = await getDownloadURL(reference)
            listaUrl.push(URL)
        }

        setImageUrls(listaUrl)
        setProdutos(listaProdutos)
    }


    
   



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#F6F6F6",
            alignItems: "center",

        },
        caixaItens: {
            width: "100%",
            height: "58%",
            display: "flex",
            flexWrap:"wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row"
        },
        itens: {
            display: "flex",
            borderColor: "#D5AB30",
            borderWidth: 1,
            width: "45%",
            height:"60%",
            borderRadius:20,
            alignItems:"center",
            marginBottom:8,
            
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
            
             
                
                <View style={styles.caixaItens} >
                    {
                        Array.isArray(produtos)?

                           produtos.map((prod,index)=>{
                            return(
                                <TouchableOpacity style={styles.itens} key={index} onPress={()=>navigation.navigate('Produtos',{item: prod, image:imageUrls[index]})}>
                                    <Image style={styles.imagemProduto} source={{uri:imageUrls[index]}}/>
                                    <View>
                                        <Text style={styles.textoSuco}>{prod.nome}</Text>
                                    </View>
            
                                    <View>
                                        <Text style={styles.textoPreco}>R$ {prod.preco}</Text>
                                    </View>
                                </TouchableOpacity>
                                )
                            })


                            :
                            <TouchableOpacity style={styles.itens}>
                        <View >
                            <Text style={styles.textoSuco}> Carregando informações....</Text>
                        </View>
                    </TouchableOpacity>
                    }
                    </View>



            </View>
        

    )
}