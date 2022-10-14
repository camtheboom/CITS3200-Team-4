import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Modal , TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import firebaseConfig from "./firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { writeUserData, writeLocationData, writePositionData, listOfLocationsVisited, writeMovementData, reasonForMovement } from "./database";
import * as React from 'react';
import { useEffect, useState, useRef, createContext, useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import styles from './styles/default.js';

///////////////////////////////////////////////////////Global Variables///////////////////////////////////////////////////////
const app = initializeApp(firebaseConfig); //Initialises the database
const auth = getAuth(app);
const db = getDatabase();
const position_time_interval = 2000; //Interval of time between recording user position. 1000 = 1 second.
const movement_time_interval = 5000; //Interval of time between checking if user moved. 1000 = 1 second.
const stopped_time_interval = 10000; //Interval of time between checking if user stopped. 1000 = 1 second.
const movement_threshold = 10; //Threshold. When the user moves further than this threshold, we consider it 'movement'
const stopped_threshold = 10; //Threshold. When the user has not moved further than this threshold, we consider it 'stopped'.
///////////////////////////////////////////////////////Global Variables///////////////////////////////////////////////////////

//This function returns the last X visited locations, where X is the number_of_locations.
function getLastLocationsVisited(visited_locations, number_of_locations) {
  if (number_of_locations > visited_locations.length) {
    return (visited_locations);
  } else {
    const index = -1 * number_of_locations;
    const last_locations = visited_locations.slice(index);
    return (last_locations);
  }
};
// Nav Bar Imports

import { Component } from 'react'
import TravelLogScreen from './screens/TravelLog';
import StatisticsScreen from './screens/Statistics';
import SettingsScreen from './screens/Settings';
import ProfileScreen from './screens/Profile';
import ManualLog from './screens/ManualLog';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator(); //Creating a stack navigator to navigate between the screens.
  

const Tab = createMaterialBottomTabNavigator();
const App = () => {
  let movement_change = 10; //A placeholder until we have access to GPS and can calculate the change in movement.
  let current_coordinates = 5; //A placeholder until we have access to GPS.
  const [tracking, setTracking] = useState(false);
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  //This stores whether the user has moved or not, as well as their reason for moving
  const [hasMoved, sethasMoved] = useState(false);
  const [movement, setMovement] = useState('');

  //This stores whether the user has stopped or not, as well as their reason for moving
  const [hasStopped, sethasStopped] = useState(false);
  const [location, setLocation] = useState('');

  const [movement_method, setMovement_method] = useState("")

  //Checks if user movement exceeds the threshold. Needs to be updated with GPS.
  function checkMovement() {
    if (movement_change >= movement_threshold && tracking) {
      sethasMoved(true);
      window.current_coordinates = 5000;
    } else {
      sethasMoved(false);
    }
  }

  //Checks if user has moved below the threshold. Needs to be updated with GPS.
  function checkStopped() {
    if (movement_change <= stopped_threshold && tracking) {
      sethasStopped(true);
      window.current_coordinates = 5000;
    }
  }

  function writePositionDataIfTracking() {
    if(tracking) {
      writePositionData(user.uid, current_coordinates)
    }
  }

  //This is used for tracking movement, and prompts the user to say why they have moved every 5 seconds.
  const test = useEffect( () => {
    const timer_movement = setTimeout( () => checkMovement(), movement_time_interval);
    setMovement('');

    return () => {
      clearTimeout(timer_movement);
  }}, [tracking]);

  test;

  useEffect( () => {
    const timer_movement = setTimeout( () => checkMovement(), movement_time_interval);
    setMovement('');

    return () => {
      clearTimeout(timer_movement);
  }}, [hasMoved]);

  //This is used for tracking locations, and prompts the user to say why they have stopped every 10 seconds.
  useEffect( () => {
    const timer_stopped = setTimeout( () => checkStopped(), stopped_time_interval);
    setLocation('');
    setMovement_method('');

    return () => {
      clearTimeout(timer_stopped);
    }
  }, [tracking]);

  useEffect( () => {
    const timer_stopped = setTimeout( () => checkStopped(), stopped_time_interval);
    setLocation('');
    setMovement_method('');

    return () => {
      clearTimeout(timer_stopped);
    }
  }, [hasStopped]);

  //This is used to continually log the users location
  useEffect( () => {
    const timer = setInterval( () => {writePositionDataIfTracking()}, position_time_interval);

    return () => {
      clearInterval(timer);
    }
  }, []);

  //This set of code below successfully updates with the last location visited
  const [last_loc, setLast_loc] = useState("");
  useEffect( () => {
    return onValue(ref(db, 'users/' + user.uid + '/locations_visited/'), querySnapShot => {
      let data = querySnapShot || {};
      let items = listOfLocationsVisited(data);
      let last_item = getLastLocationsVisited(items, 1);
      console.log(items);
      console.log(last_item);

      setLast_loc(last_item[0]);
      setMovement_method('');
    })
  }, []);

  const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("App");
            }
        })
        return unsubscribe;
    },  [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then(userCredentials => {
            setUser(userCredentials.user);
            setLoggedIn(true);
            console.log("Registered with:", user.email);
        }) 
        .catch(error => alert(error.message));
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
            setUser(userCredentials.user);
            console.log("Logged in with:", user.email);
        }) 
        .catch(error => alert(error.message));
    }
    return(
      <View style = {styles.container}>
          <View style = {styles.container}>
              <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.logInput}
              />
              <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  style={styles.logInput}
                  secureTextEntry
              />
          </View>

          <View style = {styles.container}>
              <TouchableOpacity
                  onPress={handleLogin} 
                  style = {styles.button}
              >
                  <Text style = {styles.textStyle}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={handleSignUp}
                  style = {styles.button}
              >
                  <Text style = {styles.textStyle}>Register</Text>
              </TouchableOpacity>
              <View style = {styles.div3}></View>
          </View>
        </View>
      
    )
  };

  const SignOut = () => {
    const navigation = useNavigation();
    const handleSignOut = () => {
      signOut(auth).then( () => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message));
    };

    return (
          <View style={styles.container}>
            <View style={styles.div3}></View>
            <TouchableOpacity
                  onPress={() => alert('Set up profile info under here')}
                  style={styles.button}
              >
                  <Text style={styles.textStyle}>User Info</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={handleSignOut}
                  style={styles.button}
              >
                  <Text style={styles.textStyle}>Logout</Text>
              </TouchableOpacity>
              
              <View style={styles.div3}></View>
          </View>
    )
  }


  const AutoLog = () => { //AutoLog view
    const [modalVisible, setModalVisible] = useState(true); //setting up the modal to appear before the main AutoLog page.

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
    };

    const  HomePage = ({ navigation }) => { //Creating the default view of the home screen. Edit this if you wish to change the style of the home screen.
  
      return (
          <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
              <View style = {styles.div3}></View>
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
              <View style = {styles.div3}></View>
          </View>
      )
    };
      
    const HomeScreen = () => { //Combining the three views into a stack to be navigated between.
      return (
          <NavigationContainer independent = {true}>
            <Stack.Navigator initialRouteName="Home">
  
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen name="AutoLog" component={AutoLog} />
              <Stack.Screen name="ManualLog" component={ManualLog} />
                
            </Stack.Navigator>
          </NavigationContainer>
    
            // 
      );
    };

    function HomeTabs() {
      return(
        <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'black' }} 
      activeColor="white" >
        <Tab.Screen name="Home" component={HomeScreen}            //Home Screen
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26}/>
          ),
      }}/>
        <Tab.Screen name="Settings" component={SettingsScreen}      //Settings Screen
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog-outline" color={color} size={26}/>
          ),
      }}/>
        <Tab.Screen name="TravelLog" component={TravelLogScreen}    // TravellogScreen
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map" color={color} size={26}/>
          ),
      }}/>
        <Tab.Screen name="Statistics" component={StatisticsScreen}   // Statistics Screen
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-line-variant" color={color} 
  size={26}/>
          ),
      }}/>
        <Tab.Screen name="Profile" component={ProfileScreen}   // Profile Screen
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} 
  size={26}/>
          ),
      }}/>
      <Tab.Screen name="SignOut" component={SignOut}            //Home Screen
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26}/>
          ),
      }}/>
      </Tab.Navigator>
      )
    }
  
  return (
    <NavigationContainer>
      <View>
        <Modal animationType='slide' visible={hasMoved}>
            <View style = {styles.container}>
              <View style = {styles.div1}></View>
              <Text style = {styles.h1}>Please fill out your reason for moving:</Text>
              <View style = {styles.div1}></View>
              <TextInput
                value={movement}
                placeholder="Reason for Movement"
                onChangeText={(movement) => setMovement(movement)}
              ></TextInput>
              <TouchableOpacity style = {styles.button} 
              onPress={() => {
                sethasMoved(false);
                reasonForMovement(UserId, movement, current_coordinates);
                }}><Text style = {styles.textStyle}>Send data!</Text></TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress={() => sethasMoved(false)}><Text style = {styles.textStyle}>I didn't move!</Text></TouchableOpacity>
              <View style = {styles.div1}></View> 
            </View>
          </Modal>

          <Modal animationType='slide' visible={hasStopped}>
            <View style = {styles.container}>
              <View style = {styles.div3}></View>
              <Text style = {styles.h1}>Please fill out where you have stopped:</Text>
              <TextInput
                value={location}
                placeholder="Where you have stopped"
                onChangeText={(location) => setLocation(location)}
              ></TextInput>
              <TextInput
                value={movement_method}
                placeholder="How you moved here - e.g. bus, car"
                onChangeText={(movement_method) => setMovement_method(movement_method)}
                ></TextInput>
              <TouchableOpacity style = {styles.button}
              onPress={() => {
                sethasStopped(false);
                writeLocationData(UserId, location, current_coordinates);
                writeMovementData(UserId, last_loc, location, 10, 20, movement_method)
                }}><Text style = {styles.textStyle}>Send Data!</Text></TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress={() => sethasStopped(false)}><Text style = {styles.textStyle}>I didn't stop!</Text></TouchableOpacity>
              <View style = {styles.div1}></View>
            </View>
          </Modal>

      </View>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="App" component={HomeTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App