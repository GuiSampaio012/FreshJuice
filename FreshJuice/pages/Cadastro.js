import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import camera from '../assets/camera.png'
import { ref, getDownloadURL, uploadBytesResumable,uploadString  } from "firebase/storage";
import {storage, db, } from '../firebaseconfig'
import { collection, addDoc} from "firebase/firestore";
import * as FileSystem from 'expo-file-system';
import jarra from '../assets/jarra.png'
import bacia from '../assets/bacia.png'
import * as ImagePicker from 'expo-image-picker';
import Geolocation from '@react-native-community/geolocation';
import * as Device from 'expo-device';

const Cadastro = ({ navigation }) => {
    const navigate = useNavigation()
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('')
    const [cep, setCep] = useState('');
    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [longiLate, setLongiLate] = useState()
    const [n_casa, setN_casa] = useState('');
    const [data_nascimento, setData_nascimento] = useState('');
    const [image, setImage] = useState([])
    const [preview, setPreView] = useState([])
    const [CurrentRegion, setCurrentRegion] = useState(null);

    async function loadInitialPosition(){
        await Geolocation.getCurrentPosition(
            (position) => {
                const {coords} = position
                const {latitude, longitude} = coords
                setLatitude(latitude);
                setLongitude(longitude);
                setLongiLate(`[${longitude}°N,${latitude}°E]`)
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0.005,
                })
            },
        );
    }
    useEffect(()=>{
        loadInitialPosition()
        
    },[])


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (Device.brand ==  null){
            
        }

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            //   setImageMobal(";base64," + await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' }))
        }
    };

    const escolherFotoCamera = async () => {
        let result = ImagePicker.launchCameraAsync({
            allowsEditing: true,
        })

        if (!(await result).canceled) {
            setImage(result.assets[0].uri)
            // setImageMobal(";base64," + await FileSystem.readAsStringAsync((await result).assets[0].uri, { encoding: 'base64' }))
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


    //######################## Imagem ############################
    useEffect(() => {
        if (image) {
            setPreView(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(preview)
        setPreView(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    //######################## Fim Imagem ########################

    const upload = e => {
        e.preventDefault()

        const file = image

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

        if (image == null) return

        const storageRef = ref(
            storage,
            `images/${nome}_perfil`
        )
        // const uploadTask = uploadBytesResumable(storageRef, file)
        uploadString(storageRef, image, 'data_url').then(() => {
            console.log('Uploaded a data_url string!');
          });

        // uploadTask.on('state_changed', snapshot => {
        //     const progress = Math.round(
        //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //     )
        //     setTimeout(() => {
        //         setProgressoPercent(progress), 1000
        //     })
        // })
        adicionar()
    }

    async function adicionar() {
        await addDoc(collection(db, 'usuarios'), {
            data_nascimento: data_nascimento,
            email: email,
            endereco: longiLate,
            data_nascimento: data_nascimento,
            image: nome+'_perfil',
            n_casa: n_casa,
            nome: nome,
        })

        // setEmail('')
        // setNome('')
        // setTexto('Cadastrado com Sucesso!')
        // setPreView(undefined)
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FCFFEA',
            alignItems: 'center',
            justifyContent: 'center',
        },
        caixaCadastro: {
            borderColor: '#EFBA00',
            borderWidth: '1px',
            paddingVertical: '10px',
            borderRadius:'30px',
            backgroundColor: '#F6F6F6',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',
            
        },
        entrada: {
            paddingLeft: '10px',
            backgroundColor: '#FFF',
            width: '75%',
            height: '45px',
            borderWidth: '1px',
            borderRadius: '10px',
            marginBottom: '20px'
        },
        texto: {
            fontSize: '170%',
            marginBottom: '8%'
        },
        textoBtn: {
            fontSize: '120%',
            fontWeight: 'bold',
        },
        botao: {
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            width: '125%',
            height: '100%',
            backgroundColor: '#D5AB30',
            borderRadius: '10px',
            marginBottom: '8%',
            marginTop: '3%'
        },
        caixaImagem: {
            width: '80%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
        },
        imagem: {
            borderWidth: '1px',
            borderColor: '#000',
            width: '150px',
            height: '100px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
        },
        imagemCamera: {
            width: '50px',
            height: '45px',
        },
        caixaImagens: {
            marginTop: '4%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
                        keyboardType='email'
                        onChangeText={(e) => setEmail(e)}
                    />


                    <TextInput
                        secureTextEntry={true}
                        style={styles.entrada}
                        placeholder='Senha'
                        keyboardType='text'
                        onChangeText={(e) => setSenha(e)}
                    />


                    {/* <TextInput
                        style={styles.entrada}
                        placeholder='CEP'
                        onChangeText={(e) => { setCep(e) }}
                    /> */}


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
                        {image && <Image source={{ uri: image }} style={styles.imagem} />}
                        {/* <img src={preview} style={styles.imagem} /> */}
                        <TouchableOpacity title="Pick an image from camera roll" onPress={Device.brand != null ? escolherFoto : pickImage}>
                            <img style={styles.imagemCamera} src={camera} />
                        </TouchableOpacity>
                    </View>


                    <View style={styles.caixa}>
                        <TouchableOpacity 
                            style={styles.botao}
                            onPress={upload}
                            // activeOpacity={0.9}
                        >
                            <Text style={styles.textoBtn}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.caixaImagens}>
                    <img src={jarra}/>
                    <img src={bacia}/>
                </View>
                

            </View>
        </>
    )
}
export default Cadastro;