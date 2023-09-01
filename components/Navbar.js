import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native'
// import axios from 'axios'
import logo from '../assets/logoJuice.png'
import { useNavigation } from '@react-navigation/native'

export default function Navbar() {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#FCFFEA",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            borderColor:"black",
            borderWidth:2,
        },
        menu: {
            justifyContent:"space-around",
            width: "100%",
            height: 40,
            flexDirection: "row",
            padding:5,
            alignItems:"center",    
        },
        figura: {
            width:"15%",
            height: 40,
            alignItems: "center"    
        },
        logo:{
            width: 10,
            height:10
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
            display:"flex",
            flexDirection:"row",

            width:"100%",
            justifyContent: "center",
            alignItems: "center",
        }
    });
    return(
        <View style={styles.container}>
            <View style={styles.menu}>

                <View style={styles.marca}>
                    {/* <img src={logo} style={styles.logo}/> */}
                    <Image source={logo}/>
                    <Text style={styles.fresh}>
                        FRESH
                    </Text>
                    <Text style={styles.juice}>
                        JUICE
                    </Text>
                </View>

                {/* <View style={styles.figura}>
                    
                    {logado ?
                        <TouchableOpacity
                                onPress={() => deslogar()}
                        >
                            <Text style={styles.deslogar}>DESLOGAR </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Fontisto name={"male"} size={35} color="black" />
                        </TouchableOpacity>
                    }
                </View> */}
            </View>
        </View>
    )

}