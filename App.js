import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, Button, Alert, Modal , TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, SafeAreaView, ScrollView, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push, child, get } from "firebase/database";
import firebaseConfig from "./firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { writeUserData, writeLocationData, writePositionData, listOfLocationsVisited, writeMovementData, reasonForMovement, writeManualLog, writePersonalInfo } from "./database";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState, useRef, createContext, useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import styles from './styles/default.js';

import run from './assets/run.png';
import bicycle from './assets/bicycle.png';
import bus from './assets/bus.png';
import train from './assets/train.png';
import car from './assets/car.png';
import credits from './assets/credits.png';
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"

import { SectionList } from 'react-native';

///////////////////////////////////////////////////////Global Variables///////////////////////////////////////////////////////
const app = initializeApp(firebaseConfig); //Initialises the database
const auth = getAuth(app);
const db = getDatabase();
const position_time_interval = 20000; //Interval of time between recording user position. 1000 = 1 second.
const movement_time_interval = 30000; //Interval of time between checking if user moved. 1000 = 1 second.
const stopped_time_interval = 30000; //Interval of time between checking if user stopped. 1000 = 1 second.
const movement_threshold = 5; //Threshold. When the user moves further than this threshold, we consider it 'movement'
const stopped_threshold = 5; //Threshold. When the user has not moved further than this threshold, we consider it 'stopped'.
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
//import TravelLogScreen from './screens/TravelLog';
import StatisticsScreen from './screens/Statistics';
import SettingsScreen from './screens/Settings';
import ProfileScreen from './screens/Profile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { setBadgeCountAsync } from 'expo-notifications';
import { ToastProvider } from 'react-native-toast-notifications';

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
  const [prevLocation, setPrevLocation] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [distance, setDistance] = useState(-1);

  const [location, setLocation] = useState('');
  const [movement_method, setMovement_method] = useState("")
  const [manualLog, setManualLog] = useState([]);

  const R = 6371e3; //metres
  //Used to compute distance between two longitude-latitude points
  function comp_dist(lat1, lat2, lon1, lon2) {
    const lat1_trans = lat1 * Math.PI/180;
    const lat2_trans = lat2 * Math.PI/180;
    const lat_diff = (lat2 - lat1) * Math.PI/180;
    const lon_diff = (lon2 - lon1) * Math.PI/180;

    const a = Math.sin(lat_diff/2) * Math.sin(lat_diff/2) + Math.cos(lat1_trans) * Math.cos(lat2_trans) * Math.sin(lon_diff/2) * Math.sin(lon_diff/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    return(d);
  }

  const [modalVisible, setModalVisible] = useState(true); //setting up the modal to appear before the main App page.

  //Checks if user movement exceeds the threshold. Needs to be updated with GPS.
  function checkMovement() {
    console.log('Checking for movement...');
    if (distance >= movement_threshold && tracking) {
      sethasMoved(true);
      window.current_coordinates = 5000;
    } else {
      sethasMoved(false);
    }
  }

  //Checks if user has moved below the threshold. Needs to be updated with GPS.
  function checkStopped() {
    console.log('Checking if stopped...');
    if (distance <= stopped_threshold && distance >= 0 && tracking) {
      sethasStopped(true);
      window.current_coordinates = 5000;
    }
  }

  //This is used to ensure that we keep checking for if the user has stopped/moved
  const [stopCount, setStopCount] = useState(0);
  const [moveCount, setMoveCount] = useState(0);

  //This is used for tracking movement, and prompts the user to say why they have moved every 5 seconds.
  useEffect( () => {
    const timer_movement = setTimeout( () => {
      checkMovement();
      if (user && tracking){
        setMoveCount(moveCount + 1);
      }
    }, movement_time_interval);
    setMovement('');

    return () => {
      clearTimeout(timer_movement);
  }}, [moveCount, tracking]);

  //This is used for tracking locations, and prompts the user to say why they have stopped every 10 seconds.
  useEffect( () => {
    const timer_stopped = setTimeout( () => {
      checkStopped();
      if (user && tracking){
        setStopCount(stopCount + 1);
      }
    }, stopped_time_interval);
    setLocation('');
    setMovement_method('');

    return () => {
      clearTimeout(timer_stopped);
    }
  }, [stopCount, tracking]);

  const addResponse = res => {
    setManualLog(current => [...current, res]);
  }

  const test = () => {
    console.log('test');
  }

  setInterval( () => {
    test;
  }, 1000);

  const [locationCount, setLocationCount] = useState(0);
  useEffect( () => {
    const timer = setTimeout( () => { 
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            if (user && tracking) {
              let location = await Location.getCurrentPositionAsync({});
              if (prevLocation == ''){
                setPrevLocation(location['coords']);
              } else if (newLocation == '') {
                setNewLocation(location['coords']);
              } else {
                let d = comp_dist(prevLocation['latitude'], newLocation['latitude'], prevLocation['longitude'], newLocation['longitude']);
                setDistance(d);
              }
              //Sets previous location to (now old) new location, then new location to your current location.
              setPrevLocation(newLocation); 
              setNewLocation(location['coords']); 
              setLocationCount(locationCount + 1);
              writePositionData(user.uid, location['coords']);
              console.log(prevLocation);
              console.log(newLocation);
            }
        })();
    }, position_time_interval)
    return () => {
        clearTimeout(timer);
      }
  }, [locationCount, tracking]);

  //Retrieves the users manual log entries and saves them as a list of objects, where each object is an entry.
  useEffect( () => {
    onValue(ref(db, 'users/' + user.uid + '/manual_log'), (snapshot) => {
      let data = snapshot.val();
      setManualLog([])
      const listOfResponses = [];

      if (data == null){
        setManualLog([]);
      } else {
        let responses = Object.getOwnPropertyNames(data);
        for (let i = 0; i < responses.length; i++){
            let response = data[responses[i]];
            listOfResponses.push(response);
        };
        setManualLog(listOfResponses)
      }
    })
  }, [user]);

  function getListOfManualLog(snapshot){
    const data = snapshot.val();
    const listOfResponses = [];
  
    if (data == null){
      return(listOfResponses);
    };
  
    const responses = Object.getOwnPropertyNames(data);
    for (let i = 0; i< responses.length; i++){
      let response = data[responses[i]];
      listOfResponses.push(response);
    }
    return(listOfResponses);
  };


  function getManualLog(UserId){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${UserId}/manual_log`)).then((snapshot) => {
      if (snapshot.exists()) {
        const listResponses = getListOfManualLog(snapshot);
        setManualLog(manualLog.concat(listResponses));
        console.log(manualLog);
      } else {
        console.log("No data avaliable")
      }
    }).catch((error) => {
      console.log(error);
    });
  }

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
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true); //setting up the modal to appear before the main App page.

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
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
            writePersonalInfo(userCredentials.user.uid, age, weight, gender)
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

    const handleSignOut = () => {
      signOut(auth).then( () => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message));
    };

    return(
      <View style = {styles.container}>
          <View style = {styles.bigcontainer}>
            <View style = {styles.div1}></View>
              <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.welcomeInput}
              />
              <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  style={styles.welcomeInput}
                  secureTextEntry
              />
              
              <TouchableOpacity
                  onPress={() => handleLogin()} 
                  style = {styles.button}
              >
                  <Text style = {styles.textStyle}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
              // on press, set modal to visible and handle sign in
                  onPress={() => setModalVisible(!modalVisible)}  

                  style = {styles.button}
              >
                  <Text style = {styles.textStyle}>Register</Text>
              </TouchableOpacity>
          </View>

          <View style = {styles.container}>
              
              <View style = {styles.div3}></View>

              <Text style = {styles.creditText}>
                Made by Cameron Brown, Kai York Neo, Cameron Nguyen, Jonas Jixiao Wang and Cameron Roth.
              </Text>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={!modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.container}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                    Welcome to the Human Movement Mapping Trial!
                    It appears this is your first time logging into the application.
                    To enter the app, please confirm your email and password, and enter your age, weight and gender identity.
                    If you clicked register by mistake, click cancel.
                    </Text>
                  
                  <TextInput
                    placeholder="Age"
                    value = {age}
                    onChangeText={(age) => setAge(age)}
                    style={styles.welcomeInput}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    placeholder="Weight (in KG)"
                    value = {weight}
                    onChangeText={(weight) => setWeight(weight)}
                    style={styles.welcomeInput}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    placeholder="Gender"
                    value={gender}
                    onChangeText={(gender) => setGender(gender)}
                    style={styles.welcomeInput}
                  />

                <TouchableOpacity
                  style={styles.startbutton}
                  // On press, change the value of modalVisible
                  onPress={() => {handleSignUp()}}
                >
                  <Text style={styles.textStyle}>CONFIRM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.redbutton}
                  // on press, handle sign up and change visible to false
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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
            <Image source={train} style = {{width:100, height: 100}}></Image>
            <View style={styles.div1}></View>
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

  const ManualLog = () => {

    // const  ManualPage = ({ navigation }) => { 
    
      const [start, setStart] = useState('');
      const [last, setLast] = useState('');
      const [description, setDescription] = useState('');
      const [transport, setTransport] = useState('');
    
        const modes = [
          'Car',
          'Walk',
          'Ride',
          'Train',
          'Bus'
        ];
    
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
                    setTransport(selectedItem);
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
                  <TextInput 
                  placeholder="Start Location"
                  style={{justifyContent: 'flex-start',}} 
                  value={start} 
                  onChangeText={(start) => setStart(start)}/>
                </View>
                <View>
                  <TextInput 
                  placeholder="End Location" 
                  style={{justifyContent: 'flex-end',}} 
                  value={last}
                  onChangeText={(last) => setLast(last)}/>
                </View>
                <View>
                  <TextInput 
                  placeholder="Description" 
                  multiline 
                  value={description}
                  onChangeText={(description) => setDescription(description)}/>
                </View>
                <View>
                <Button
            title="Submit"
            color="#f194ff"
            onPress={() => {
              writeManualLog(user.uid, start, last, description, transport);
            }}
          />  
                </View>
            </View>
            </View>
          </SafeAreaView>
          
    
        );
            
      };

  const AutoLog = () => { //AutoLog view

    return (
        

        <View style={styles.centeredView} >
          <View style = {styles.div}></View>
          <View style = {styles.div}></View>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
                    ATTENTION: AutoLog will log your location data every minute. Click START to begin location tracking.
            </Text>
          </View>
          <View style = {styles.div}></View>

          <TouchableOpacity style ={styles.startbutton}>
          <Pressable onPress={() => setTracking(true)}>
            <Text style={styles.textStyle}>START</Text>
          </Pressable>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.redbutton}>
          <Pressable onPress={() => setTracking(false)}>
            <Text style={styles.textStyle}>STOP</Text>
          </Pressable>
          </TouchableOpacity>
          <View style = {styles.div3}></View>
          
        </View>
      );
    };

// TRAVEL LOG SCREEN

    const TravelLog = () =>{
    // export default function TravelLog() {
      const newTaskData = [{
        title: "Past Logs",
        data: manualLog
      }];
      return (
        <View style={styles.container}>
          <SectionList
            sections={[...newTaskData]}
            renderItem={({item})=>(
                <Text style={styles.taskItem}> 
                Mode of Transport: {item.method_of_movement} {'\n'}
                Start Location: {item.start_location} {'\n'}
                End Location: {item.end_location} {'\n'}
                Description: {item.description} 
                </Text>
            )}
            
            renderSectionHeader={({section})=>(
              <Text style={styles.taskTitle}>{section.title}</Text>
            )}
            keyExtractor={item=>item.id}
            stickySectionHeadersEnabled
          />
        </View>
      );
    }

// ^^^^^^
 //location tracking stuff
    const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
    let foregroundSubscription = null

    // Defining the background task for location tracking
    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
        if (error) {
            console.error(error)
            return
        }
        if (data) {
            // Extract location coordinates from data
            const { locations } = data
            const location = locations[0]
        }
    })
    // Define position state: {latitude: number, longitude: number}
    const [position, setPosition] = useState(null)

    // Request permissions right after starting the app
    useEffect(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()
            if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
        }
        requestPermissions()
    }, [])
    // Start location tracking in foreground
    const startForegroundUpdate = async () => {
        // Check if foreground permission is granted
        const { granted } = await Location.getForegroundPermissionsAsync()
        if (!granted) {
            console.log("location tracking denied")
            return
        }

        // Make sure that foreground location tracking is not running
        foregroundSubscription?.remove()

        // Start watching position in real-time
        foregroundSubscription = await Location.watchPositionAsync(
            {
                // For better logs, we set the accuracy to the most sensitive option
                accuracy: Location.Accuracy.BestForNavigation,
            },
            location => {
                setPosition(location.coords)
            }
        )
    }

    // Stop location tracking in foreground
    const stopForegroundUpdate = () => {
        foregroundSubscription?.remove()
        setPosition(null)
    }

    // Start location tracking in background
    const startBackgroundUpdate = async () => {
        // Don't track position if permission is not granted
        const { granted } = await Location.getBackgroundPermissionsAsync()
        if (!granted) {
            console.log("location tracking denied")
            return
        }

        // Make sure the task is defined otherwise do not start tracking
        const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
        if (!isTaskDefined) {
            console.log("Task is not defined")
            return
        }

        // Don't track if it is already running in background
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TASK_NAME
        )
        if (hasStarted) {
            console.log("Already started")
            return
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            // For better logs, we set the accuracy to the most sensitive option
            accuracy: Location.Accuracy.BestForNavigation,
            // Make sure to enable this notification if you want to consistently track in the background
            showsBackgroundLocationIndicator: true,
            foregroundService: {
                notificationTitle: "Location",
                notificationBody: "Location tracking in background",
                notificationColor: "#fff",
            },
        })
    }

    // Stop location tracking in background
    const stopBackgroundUpdate = async () => {
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TASK_NAME
        )
        if (hasStarted) {
            await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
            console.log("Location tacking stopped")
        }
    }

    // initial placeholder value for intiliasing map
    const [mapRegion, setmapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });



    const  HomePage = ({ navigation }) => { //Creating the default view of the home screen. Edit this if you wish to change the style of the home screen.
  
      return (
          <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            
              <View style = {styles.div3}></View>
              <Image source={run} style = {{width:100, height: 100}}></Image>
              <View style = {styles.div1}></View>
              <Text>Home Screen</Text>
              <TouchableOpacity //Button that, when clicked, navigates to the AutoLog screen.
                  onPress={() => navigation.navigate('AutoLog')}
                  style={styles.button}>
                  <Text style={styles.textStyle}>Start Automatic tracking</Text>
              </TouchableOpacity>
              <TouchableOpacity //Button that, when clicked, navigates to the ManualLog screen.
                  onPress={() => navigation.navigate('ManualLog')}
                  style={styles.button}>
                  <Text style={styles.textStyle}>Manual Log</Text>
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
        <Tab.Screen name="Auto Log" component={AutoLog}            //Home Screen
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26}/>
          ),
      }}/>
      <Tab.Screen name="Manual Log" component={ManualLog}            //Home Screen
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26}/>
          ),
      }}/>
        <Tab.Screen name="TravelLog" component={TravelLog}    // TravellogScreen
        options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map" color={color} size={26}/>
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
