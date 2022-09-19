import { StyleSheet, Button, Alert, Modal , TextInput, TouchableOpacity } from 'react-native';
import {View,Text} from 'react-native';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from '../styles/default.js';
import DownloadPage from './Download.js';
import NotificationPage from './Notification.js';

// import AutoLog from './AutoLog.js' //Importing AutoLog and ManualLog js files, which are displayed when the respective button is clicked.
// import ManualLog from './ManualLog.js'

const Stack = createNativeStackNavigator(); //Creating a stack navigator to navigate between the screens.

const SettingsPage = ({ navigation }) => { //Creating the default view of the home screen. Edit this if you wish to change the style of the home screen.
  return (
      <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
          <View style = {styles.div}></View>
          <Text>Settings</Text>
          <TouchableOpacity //Button that, when clicked, navigates to the AutoLog screen.
              onPress={() => navigation.navigate('Download')}
              style={styles.button}>
              <Text style={{ fontSize: 20, textAlign: 'center', color:'#fff'}}>Download Data</Text>
          </TouchableOpacity>
          <TouchableOpacity //Button that, when clicked, navigates to the ManualLog screen.
              onPress={() => navigation.navigate('Notification Settings')}
              style={styles.button}>
              <Text style={{ fontSize: 20, color: '#fff' }}>Notification Settings</Text>
          </TouchableOpacity>
          <View style = {styles.div}></View>
      </View>
  )
}

const Settings = () => { //Combining the three views into a stack to be navigated between.
    return (
        <NavigationContainer independent = {true}>
          <Stack.Navigator initialRouteName="Settings">

            <Stack.Screen name="Settings" component={SettingsPage} />
            <Stack.Screen name="Download" component={DownloadPage} />
            <Stack.Screen name="Notification Settings" component={NotificationPage} />
            
          </Stack.Navigator>
        </NavigationContainer>

        // 
    )
}
export default Settings