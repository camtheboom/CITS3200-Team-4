//Manual Log Page - This is the page that is displayed when the user clicks the Manual Log button on the home screen. 
//This page is not yet implemented, but will be used to manually log a task.

import React, { FC, useState } from "react";
import { TextInput } from 'react-native-paper';


import SelectDropdown from 'react-native-select-dropdown'

import {View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image, Button} from 'react-native';
const {width} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CurrentRenderContext } from "@react-navigation/native";



import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import TravelLog from './TravelLog.js'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator(); //Creating a stack navigator to navigate between the screens.

export default ManualLog = () => {

// const  ManualPage = ({ navigation }) => { 

  const [start, las, description, setMessage] = useState('');
  const navigation = useNavigation();
  const goToTravelLog = () => {
    navigation.navigate('TravelLog', {
      start,
      las,
      description,
    });
  };

    const modes = [
      'Car',

      'Walk',
      'Ride',
      'Train',
      'Bus'
 
    ];
    const [text, setText] = React.useState("");


    const renderHeader = () => {
        

      return (
        <View style={[styles.header, styles.shadow]}>
          <Text style={styles.headerTitle}>{'What did you do?'}</Text>
        </View>
      );
    };
  
    return (
      <SafeAreaView style={styles.saveAreaViewContainer}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <View style={styles.viewContainer}>
          {renderHeader()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewContainer}>

  
            <SelectDropdown
              data={modes}

              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={'Select Mode of Transport'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
  
          </ScrollView>
        </View>
        <View style={styles.textBoxLocation}>
          <View>
            <View>
              <TextInput placeholder="Start Location" style={{justifyContent: 'flex-start',}} value={start}/>
            </View>
            <View>
              <TextInput placeholder="End Location" style={{justifyContent: 'flex-end',}} value={las}/>
            </View>
            <View>

              <TextInput label="Description" multiline value={description}/>
            
            </View>
            <View>
            <Button
        title="Submit"
        color="#f194ff"
        onPress={goToTravelLog}
      />  
            </View>
        </View>
        </View>
      </SafeAreaView>
      


    );
        
  };
  
  const styles = StyleSheet.create({
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      width,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F6F6F6',
    },
    headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
    saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
    viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: '10%',
      paddingBottom: '20%',
    },
  
    dropdown1BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

    textBoxLocation: {
        // position: "absolute",
        top: -220,
        flexwrap: "row"
        // alignItems: "center"
    },


  
  });


