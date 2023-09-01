import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import axios from 'axios'
import camera from '../assets/camera.png'
import { ref, getDownloadURL, uploadBytesResumable,uploadString  } from "firebase/storage";
import {storage, db, app } from './firebaseConfig'
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc} from "firebase/firestore";
// import * as FileSystem from 'expo-file-system';
import jarra from '../assets/jarra.png'
import bacia from '../assets/bacia.png'
import * as ImagePicker from 'expo-image-picker';
// import Geolocation from '@react-native-community/geolocation';
import * as Device from 'expo-device';
import {DatePicker} from 'react-native-date-picker'



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

    const auth = getAuth(app);
    const criarUmLogin = () => {
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                // navigation.navigate('Home', { usuario: user.email })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    // async function loadInitialPosition(){
    //     await Geolocation.getCurrentPosition(
    //         (position) => {
    //             const {coords} = position
    //             const {latitude, longitude} = coords
    //             setLatitude(latitude);
    //             setLongitude(longitude);
    //             setLongiLate(`[${longitude}°N,${latitude}°E]`)
    //             setCurrentRegion({
    //                 latitude,
    //                 longitude,
    //                 latitudeDelta: 0,
    //                 longitudeDelta: 0.005,
    //             })
    //         },
    //     );
    // }
    // useEffect(()=>{
    //     loadInitialPosition()
        
    // },[])


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
        console.log((await result).assets[0].uri);
        if (!(await result).canceled) {
            setImage((await result).assets[0].uri)
            console.log(image);
            // setImageMobal(";base64," + await FileSystem.readAsStringAsync((await result).assets[0].uri, { encoding: 'base64' }))
        }
        setImage(result.assets[0].uri)
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
        criarUmLogin()
    }


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
            {/* <Navbar></Navbar> */}
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
                        keyboardType='text'
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


                    {/* <TextInput
                        style={styles.entrada}
                        
                        placeholder='Data de Nascimento'
                        onChangeText={(e) => { setData_nascimento(e) }}
                    /> */}
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        }}
                        onCancel={() => {
                        setOpen(false)
                        }}
                    />

                    {/* <Calendar
                        hideExtraDays={true}
                        hideDayNames={true}
                        // theme={{
                        //     calendarBackground: '#2195F2',
                        //     arrowColor: '#fff',
                        //     monthTextColor: '#fff'
                        // }}
                        style={styles.entrada}
                    /> */}


                    <View style={styles.caixaImagem}>
                        {
                            image.length == 0?
                            console.log(image)
                            :
                             <Image source={{ uri: image }} style={styles.imagem} />
                        }
                        {/* <img src={preview} style={styles.imagem} /> */}
                        <TouchableOpacity title="Pick an image from camera roll" onPress={Device.brand != null ? escolherFoto : pickImage}>
                            {/* <img style={styles.imagemCamera} src={camera} /> */}
                            <Image source={camera} style={styles.imagemCamera}/>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.caixaBtn}>
                        <TouchableOpacity 
                            style={styles.botao}
                            onPress={upload}
                            // activeOpacity={0.9}
                        >
                            <Text style={styles.textoBtn}>Cadastrar</Text>
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
                </View>
                

            </View>
        </>
    )
}
export default Cadastro;