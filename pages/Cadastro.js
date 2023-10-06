import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, PermissionsAndroid} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { decode } from 'base-64';
import camera from '../assets/camera.png'
import { ref, getDownloadURL, uploadBytesResumable,uploadString,putString ,uploadBytes,getStorage} from "firebase/storage";
import {storage, db, app } from './firebaseConfig'
import {createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc} from "firebase/firestore";
import jarra from '../assets/jarra.png'
import bacia from '../assets/bacia.png'
import * as ImagePicker from 'expo-image-picker';
import * as Device from 'expo-device';
import {DatePicker} from 'react-native-date-picker'
import axios from 'axios';
import { auth } from './firebaseConfig';



const Cadastro = () => {
      const navigate = useNavigation()
      const [email, setEmail] = useState('')
      const [nome, setNome] = useState('');
      const [senha, setSenha] = useState('')
      const [cep, setCep] = useState('');
      const [n_casa, setN_casa] = useState('');
      const [data_nascimento, setData_nascimento] = useState('');
      const [image, setImage] = useState([])
      const [cidade, setCidade] = useState();
      const [logradouro,setLogradouro] = useState();
      const [uf,setUf] = useState();
      const [bairro,setBairro] = useState();
      const [preview, setPreView] = useState()
      
      
 
    if(typeof atob === 'undefined') {
        global.atob = decode;
      }


      


    const criarUmLogin = () => {
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate.navigate('Home', { usuario: user.email })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (Device.brand ==  null){
            
        }

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setPreView(result.assets[0].uri)
        }
    };

    const escolherFotoCamera = async () => {
        let result = ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!(await result).canceled) {
            setImage((await result).assets[0].uri)
            setPreView((await result).assets[0].uri)
        }
    }

    const escolherFoto = () => {
        Alert
        Alert.alert(
            'SELECIONAR',
            'Selecione',
            [
                {
                    text: 'Galeria',
                    onPress: () => pickImage()
                },
                {
                    text: 'Camera',
                    onPress: () => escolherFotoCamera()
                }
            ]
        )
    }

    const uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
           const xhr = new XMLHttpRequest()
           xhr.onload = function () {
             // return the blob
             resolve(xhr.response)
           }
           xhr.onerror = function () {
             reject(new Error('uriToBlob failed'))
           }
           xhr.responseType = 'blob'
           xhr.open('GET', uri, true)
       
           xhr.send(null)})}

    
    const upload = async e => {
        e.preventDefault()

        const file = preview

        if (!file) {
            console.log('Faltou imagem!')
            return
        }

        if (!nome) {
            console.log('Faltou nome!')
            return
        }

        if (!email) {
            console.log('Faltou e-mail!')
            return
        }
        const storageRef = ref(
            storage,
            `images/${nome}_perfil`
        )

        const blobFile = await uriToBlob(preview)
        uploadBytes(storageRef, blobFile).then(async (snapshot) => {
            console.log('snapshot', snapshot)
            const url = await getDownloadURL(storageRef)
            return url
          })


        adicionar()
    }


    async function adicionar() {
        await addDoc(collection(db, 'usuarios'), {
            data_nascimento: data_nascimento,
            email: email,
            data_nascimento: data_nascimento,
            image: nome+'_perfil',
            cidade: cidade,
            bairro: bairro,
            logradouro: logradouro,
            uf: uf,
            cep:cep,
            n_casa: n_casa,
            nome: nome,
        })
        criarUmLogin()
    }

    const buscaCep = () => {
        if (cep.length ==8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res)=>{
                setCidade(res.data.localidade)
                setUf(res.data.uf)
                setLogradouro(res.data.logradouro)
                setBairro(res.data.bairro)
                console.log(res.data);
                
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            alert("cep incorreto")
        }
 
    }
 

    useEffect(()=>{
        if(cep.length >= 8){
            cep.replace("-","")
            buscaCep()
        }
        
    },[cep])


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#FCFFEA",
            alignItems: "center",
            justifyContent: "center",
        },
        caixaCadastro: {
            borderColor: "#EFBA00",
            borderWidth: 1,
            paddingVertical: 10,
            borderRadius:30,
            backgroundColor: "#F6F6F6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
        },
        entrada: {
            paddingLeft: 10,
            backgroundColor: "#FFF",
            width: "75%",
            height: 45,
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 15
        },
        texto: {
            fontSize: 40,
            marginBottom: "4%"
        },
        textoBtn: {
            fontSize: 20,
            fontWeight: "bold",
        },
        caixaBtn: {
            marginTop: "5%",
            marginBottom: "5%",
            width: "70%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
        },
        botao: {
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            width: "45%",
            height: 35,
            backgroundColor: "#D5AB30",
            borderRadius: 10,
        },
        caixaImagem: {
            width: "80%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
        },
        imagem: {
            borderWidth: 2,
            borderColor: "#000",
            width: 150,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
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
        }
    });

    return (
        <>
            <View style={styles.container}>
                <View style={styles.caixaCadastro}>

                    <Text style={styles.texto}>CADASTRO</Text>

                    <TextInput
                        style={styles.entrada}
                        placeholder='Nome'
                        onChangeText={(e) => { setNome(e) }}
                    />


                    <TextInput
                        style={styles.entrada}
                        placeholder='Email'
                        onChangeText={(e) => setEmail(e)}
                    />


                    <TextInput
                        secureTextEntry={true}
                        style={styles.entrada}
                        placeholder='Senha'
                        onChangeText={(e) => setSenha(e)}
                    />


                    <TextInput
                        style={styles.entrada}
                        placeholder='CEP'
                        onChangeText={(e) => { setCep(e) }}
                    />


                    <TextInput
                        style={styles.entrada}
                        placeholder='N° Casa'
                        onChangeText={(e) => { setN_casa(e) }}
                    />


                    <TextInput
                        style={styles.entrada}
                        
                        placeholder='Data de Nascimento'
                        onChangeText={(e) => { setData_nascimento(e) }}
                    />



                    <View style={styles.caixaImagem}>
                        {
                            image.length == 0?
                            <View style={styles.imagem}/>
                            :
                             <Image source={{ uri: image }} style={styles.imagem} />
                        }
                        <TouchableOpacity title="Pick an image from camera roll" onPress={Device.brand != null ? escolherFoto : pickImage}>
                            <Image source={camera} style={styles.imagemCamera}/>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.caixaBtn}>
                        <TouchableOpacity 
                            style={styles.botao}
                            onPress={upload}
                        >
                            <Text style={styles.textoBtn}>Cadastrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={()=>navigate.navigate("FreshJuice")}
                        >
                        <Text style={styles.textoBtn}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.caixaImagens}>
                <Image source={jarra}/>
                 <Image source={bacia}/>
                </View>
                

            </View>
        </>
    )
}
export default Cadastro;