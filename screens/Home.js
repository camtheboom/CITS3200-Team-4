import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Alert, Modal , TextInput, TouchableOpacity } from 'react-native';
import {View,Text} from 'react-native';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AutoLog from './AutoLog.js';
import ManualLog from './ManualLog.js';

const Stack = createNativeStackNavigator();

function Home({navigation}) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                    <View style = {styles.div}></View>
                    <Text>Home Screen</Text>
                    <TouchableOpacity
                        onPress={() => alert('hello world!')}
                        style={styles.button}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color:'#fff'}}>Start Automatic tracking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => alert('hello world!')}
                        style={styles.button}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Manual Log</Text>
                    </TouchableOpacity>
                    <View style = {styles.div}></View>
                </View>
            </Stack.Navigator>
        </NavigationContainer>

        // 
    )
}
export default Home

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