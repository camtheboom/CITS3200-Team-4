import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Modal , TextInput } from 'react-native';
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import firebaseConfig from "./firebase.config";
import { writeUserData, writeLocationData, writePositionData, listOfLocationsVisited} from "./database";

// Nav Bar Imports

import { Component } from 'react'
import HomeScreen from './screens/Home';
import TravelLogScreen from './screens/TravelLog';
import StatisticsScreen from './screens/Statistics';
import SettingsScreen from './screens/Settings';
import ProfileScreen from './screens/Profile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </Tab.Navigator>
    </NavigationContainer>
  );
}

//

const fire = initializeApp(firebaseConfig); //Initialises the database


///////////////////////////////////////////////////////Global Variables///////////////////////////////////////////////////////
const UserId = 'user04'; 
const db = getDatabase();
///////////////////////////////////////////////////////Global Variables///////////////////////////////////////////////////////


//This adds an event listener to the locations visited by the user. This runs once when the app starts, and then any time a new location is visited.
const locationRef = ref(db, 'users/' + UserId + '/locations_visited/');
onValue(locationRef, (snapshot) => {
  const visited_locations = listOfLocationsVisited(snapshot); //Returns an array of the names of the locations visited
  console.log(visited_locations); //A function to display the visited locations to the user should go here, and replace the logging.
});

/* 
  Code below is for testing the database with firebase. un comment section below to test and also test other code
*/



// const App = () => {

//   //This is used to store whether the user has agreed to have their data stored or not.
//   const [isOKAY, setisOKAY] = useState(false);

//   //Runs SQL commands to create the tables for the database if they do not already exist.
//   //Displays a warning that the app will collect personal data.
//   const Warning = () =>
//     Alert.alert(
//       "Data Collection Alert",
//       "This app may collect personal data such as location and heart rate.",
//       [
//         { text: "Cancel", onPress: () => setisOKAY(false)},
//         { text: "OK", onPress: () => setisOKAY(true)}
//       ]
//     );

//   //This creates the view that the user sees when they open the app
//   return (
//     <View style={styles.container}>
//       <Modal animationType='slide' visible={isOKAY}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text>Please fill out the details below:</Text>
//             <TextInput
//               style={styles.input}
//               defaultValue = "First Name"
//             ></TextInput>
//             <TextInput
//               style={styles.input}
//               defaultValue = "Last Name"
//             ></TextInput>
//             <Button title = "Go back" onPress = {() => setisOKAY(false)}></Button>
//           </View>
//         </View>
//       </Modal>
//       <Text>Welcome to the Human Movement Mapping Project App!</Text>
//       <Text></Text>
//       <Button title = "Send Data!" onPress={ () => {writeUserData("user01", "Cam", "fake@fake.com", "google.com")}}></Button>
//       <Button title = "Send Location Data!" onPress={ () => {writeLocationData("user04", "Gym", 10)}}></Button>
//       <Button title = "Send Position Data!" onPress={ () => {writePositionData("user04", 1000)}}></Button>
//       <StatusBar style="auto" />
//     </View>
//   );
// };

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
//   }
// });

// //export default App