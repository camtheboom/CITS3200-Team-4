// Create basic React Native app page

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Alert, Modal , TextInput, TouchableOpacity } from 'react-native';
import {View,Text} from 'react-native';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function AutoLog() {
    return (
        <View style={styles.container}>
        <Text>AutoLog</Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height:40,
        borderColor: 'black',
        borderWidth: 2
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A9A9A9',
        padding: 10,
        borderRadius: 10,
        width: 250,
        marginTop: 10,
        height: 100,
        flex: 1
    },
    div: {
        flex:1
    }
    });

export default AutoLog