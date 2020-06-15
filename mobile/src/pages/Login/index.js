import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    function navigateToIncidents() {
        navigation.navigate('Incidents');
    }

    async function login() {
        try {
            if (!email || !password) {
                alert('Informe usuário e senha!');
                return;
            }

            const response = await api.post('users/login', { email, password });
            const { accessToken } = response.data;

            await AsyncStorage.setItem('accessToken', accessToken);

            navigateToIncidents()
        } catch (error) {
            alert('Ocorreu algum erro ao realizar login!')
        }
    }

    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={logoImg} />

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)} />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={text => setPassword(text)}
                secureTextEntry={true} />

            <TouchableOpacity onPress={login} style={styles.entrar}>
                <Text style={styles.entrarText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}