import { StyleSheet, Button, Alert, Modal , TextInput, TouchableOpacity } from 'react-native';
import {View,Text} from 'react-native';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from '../styles/default.js';

import AutoLog from './AutoLog.js' //Importing AutoLog and ManualLog js files, which are displayed when the respective button is clicked.
import ManualLog from './ManualLog.js'

const Stack = createNativeStackNavigator(); //Creating a stack navigator to navigate between the screens.

function HomePage({ navigation }){ //Creating the default view of the home screen. Edit this if you wish to change the style of the home screen.
  return (
      <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
          <View style = {styles.div}></View>
          <Text>Home Screen</Text>
          <TouchableOpacity //Button that, when clicked, navigates to the AutoLog screen.
              onPress={() => navigation.navigate('AutoLog')}
              style={styles.button}>
              <Text style={{ fontSize: 20, textAlign: 'center', color:'#fff'}}>Start Automatic tracking</Text>
          </TouchableOpacity>
          <TouchableOpacity //Button that, when clicked, navigates to the ManualLog screen.
              onPress={() => navigation.navigate('ManualLog')}
              style={styles.button}>
              <Text style={{ fontSize: 20, color: '#fff' }}>Manual Log</Text>
          </TouchableOpacity>
          <View style = {styles.div}></View>
      </View>
  )
}

function Home() { //Combining the three views into a stack to be navigated between.
    return (
        <NavigationContainer independent = {true}>
          <Stack.Navigator initialRouteName="Home Page">

            <Stack.Screen name="Home Page" component={HomePage} />
            <Stack.Screen name="AutoLog" component={AutoLog} />
            <Stack.Screen name="ManualLog" component={ManualLog} />
            
          </Stack.Navigator>
        </NavigationContainer>

        // 
    )
}
export default Home

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     height:40,
//     borderColor: 'black',
//     borderWidth: 2
//   },
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#A9A9A9',
//     padding: 10,
//     borderRadius: 10,
//     width: 250,
//     marginTop: 10,
//     height: 100,
//     flex: 1
//   },
//   div: {
//     flex:1
//   }
// });