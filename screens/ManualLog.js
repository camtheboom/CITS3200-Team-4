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