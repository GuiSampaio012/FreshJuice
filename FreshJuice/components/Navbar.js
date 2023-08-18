import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
// import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

export default function Navbar() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        menu: {
            justifyContent:'space-around',
            width: '100%',
            height: 40,
            flexDirection: 'row',
            padding: '5px'    
        },
        figura: {
            width:'15%',
            height: 40,
            alignItems: 'center'    
        }
    });
    return(
        <View style={styles.container}>
            <View style={styles.menu}>
                <View style={styles.figura}>
                    {logado ?
                        <TouchableOpacity
                                onPress={() => deslogar()}
                        >
                            <Text style={styles.deslogar}>DESLOGAR </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Fontisto name={'male'} size={35} color='black' />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )

}