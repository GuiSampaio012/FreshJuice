import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
// import axios from 'axios'
import { useNavigation } from '@react-navigation/native'


export default function Home() {
    const [logado, setLogado] = useState(false)
    const [token, setToken] = useState('')
    const [teste, setTeste] = useState([])
    const [idCli, setIdCli] = useState('')
    const [saldo, setSaldo] = useState('')
    const navigation = useNavigation()

    const acesso = localStorage.getItem("dados")
    let chave = ""

   
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
        },
        campoImagem: {

        },
        abaItens: {

        },
        caixaItens: {

        },
        itens: {

        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.campoImagem}>
            </View>

            <View style={styles.abaItens}>
                <View style={styles.caixaItens}>

                    <TouchableOpacity style={styles.itens} onPress={() => navigation.navigate('Transferencia')}>
                        <Text>
                            transferências
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itens} onPress={() => navigation.navigate('Extrato')}>
                        <Text>
                            extrato
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.caixaItens}>

                    <TouchableOpacity style={styles.itens} onPress={() => navigation.navigate('Cartao')}>
                        <Text>
                            cartão de crédito
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itens} onPress={() => navigation.navigate('Emprestimo')}>
                        <Text>
                            emprestimo
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}