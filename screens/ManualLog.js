//Manual Log Page - This is the page that is displayed when the user clicks the Manual Log button on the home screen. 
//This page is not yet implemented, but will be used to manually log a task.

import { StyleSheet, Button, Alert, Modal , TextInput, TouchableOpacity } from 'react-native';
import {View,Text} from 'react-native';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from '../styles/default.js'

const ManualLog = () => {
    return (
        <View style={styles.container}>
        <Text>Manual Log</Text>
        </View>
    );
    }

export default ManualLog