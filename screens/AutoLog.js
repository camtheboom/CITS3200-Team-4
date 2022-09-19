import {Modal, TouchableOpacity, View,Text,Pressable } from 'react-native';
import React, { useState } from "react";

import styles from '../styles/default.js'

const AutoLog = () => {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        
        <View style={styles.centeredView} >
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.container}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                    ATTENTION: AutoLog will log your location data every minute. Click START on the following page to begin location tracking.
                    </Text>
                <Pressable
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View style = {styles.div}></View>
          <View style = {styles.div}></View>
          <View style = {styles.div}></View>
          <TouchableOpacity style ={styles.startbutton}>
            <Text style={styles.textStyle}>START</Text>
          </TouchableOpacity>
          <View style = {styles.div}></View>
          
        </View>
      );
    }

export default AutoLog
// hex code for green
