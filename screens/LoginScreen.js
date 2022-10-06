import { useState } from "react";;
import { useNavigation } from '@react-navigation/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from "../firebase.config";
import { initializeApp } from 'firebase/app';
import {KeyboardAvoidingView, StyleSheet, Text, View, TextInput} from 'react-native';
import * as React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from '../styles/default.js';
import { useEffect } from "react";

let app = initializeApp(firebaseConfig)

const auth = getAuth(app);
const navigation = useNavigation;

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('logged in');
            }
        })
        return unsubscribe;
    },  [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registered with:", user.email);
        }) 
        .catch(error => alert(error.message));
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with:", user.email);
        }) 
        .catch(error => alert(error.message));
    }

    return(
        <KeyboardAvoidingView behaviour="padding">
            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.container}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.button}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;