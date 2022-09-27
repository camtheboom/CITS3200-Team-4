import {Modal, TouchableOpacity, View,Text,Pressable } from 'react-native';
import React, { useState, forwardRef, useImperativeHandle } from "react";

import styles from '../styles/default.js' //Importing the default styles from the styles folder.

const AutoLog = forwardRef((props, _ref) => { //AutoLog view
    const [modalVisible, setModalVisible] = useState(true); //setting up the modal to appear before the main AutoLog page.
    const [tracking, setTracking] = useState(false);

  useImperativeHandle(_ref, () => ({
    getTrackingStatus: () => {
      return tracking;
    },
  }));

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
          <Pressable onPress={() => setTracking(true)}>
            <Text style={styles.textStyle}>START</Text>
          </Pressable>
          </TouchableOpacity>

          <View style = {styles.div}></View>

          <TouchableOpacity style ={styles.startbutton}>
          <Pressable onPress={() => setTracking(false)}>
            <Text style={styles.textStyle}>STOP</Text>
          </Pressable>
          </TouchableOpacity>
          <View style = {styles.div}></View>
          
        </View>
      );
    });

export default AutoLog
// hex code for green
