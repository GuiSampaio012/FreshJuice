import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native'
import logo from '../assets/logoJuice.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, where, getDocs,getFirestore, Firestore } from "firebase/firestore";
import { app, storage} from '../pages/firebaseConfig';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useRoute } from '@react-navigation/native';


export default function NavBar() {
    const [image,setImageURL] = useState()
    const[usario,setUsuario] = useState()
    const db = getFirestore(app)

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem("user");
      
          if (value !== null) {
            findImage(value)
            
          }
        } catch (e) {
        //   alert('Failed to fetch the input from storage');
        console.log("a");
        }
      };

    useEffect(()=>{
        readData()
    },[])

    const findImage = async(user) =>{
        const querySnapshot = await getDocs(collection(db, "usuarios"),where("email","==",user));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // console.log(doc.data().image);
        const reference =ref(storage,"images/"+doc.data().image) 
        getDownloadURL(reference).then((x)=>{
             setImageURL(x)
        })
        setUsuario(doc.data())
        });

    }
  

    const styles = StyleSheet.create({
        container: {
            marginTop: 20,
            backgroundColor: "#FCFFEA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        menu: {
            display: "flex",
            alignItems: "center",
            //justifyContent: "space-between",
            justifyContent: "space-around",
            width: "100%",
            height: 40,
            flexDirection: "row",
            padding: 5,    
        },
        juice:{
            color:"#FF914D",
            fontWeight:"bold",
            fontSize:24
        },
        fresh:{
            color:"#77B725",
            fontWeight:"bold",
            fontSize:24
        },
        marca:{
            width:"100%",
            display:"flex",
            flexDirection:"row",
            justifyContent: "center",
            alignItems: "center",
        },
        image:{
            width:40,
            height:40,
            marginRight:5
        },
        imageUser:{
            position: "absolute",
            left:8,
            width:30,
            height:30,
            marginRight:5
        },
        userImage:{
            width:40,
            height:40,
            borderRadius:10,
            marginLeft:3,
        }
        
    });
    return(
        <View style={styles.container}>
            <View style={styles.menu}>

                <Image  style={styles.imageUser} source={{uri: image }}/>
                
                <View style={styles.marca}>
                    {/* <img src={logo} style={styles.logo}/> */}
                    <Image style={styles.image} source={logo}/>
                    <Text style={styles.fresh}>
                        FRESH
                    </Text>
                    <Text style={styles.juice}>
                        JUICE
                    </Text>
                </View>

            </View>
        </View>
    )

}