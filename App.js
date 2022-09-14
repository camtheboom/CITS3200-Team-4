import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Button, Alert, Modal, TextInput, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push, get, child } from "firebase/database";
import firebaseConfig from "./firebase.config";
import { writeUserData, writeLocationData, writePositionData, listOfLocationsVisited, writeMovementData, reasonForMovement } from "./database";



///////////////////////////////////////////////////////Global Variables///////////////////////////////////////////////////////
const fire = initializeApp(firebaseConfig); //Initialises the database
const UserId = 'user07';
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

//This adds an event listener to the locations visited by the user. This runs once when the app starts, and then any time a new location is visited.
const locationRef = ref(db, 'users/' + UserId + '/locations_visited/');
onValue(locationRef, (snapshot) => {
  var visited_locations = listOfLocationsVisited(snapshot); //Returns an array of the names of the locations visited
  var last_10_locations = getLastLocationsVisited(visited_locations, 10);

  console.log(visited_locations); //Used for debugging, remove when locations are displayed to the user in the app
  console.log(last_10_locations); //Same as above.
  console.log(snapshot);
  window.last_10_locations = last_10_locations;
  window.last_location = getLastLocationsVisited(visited_locations, 1);
});

const App = () => {
  let movement_change = 10; //A placeholder until we have access to GPS and can calculate the change in movement.
  let current_coordinates = 5; //A placeholder until we have access to GPS.

  //This stores whether the user has moved or not, as well as their reason for moving
  const [hasMoved, sethasMoved] = useState(false);
  const [movement, setMovement] = useState('');

  //This stores whether the user has stopped or not, as well as their reason for moving
  const [hasStopped, sethasStopped] = useState(false);
  const [location, setLocation] = useState('');

  //Checks if user movement exceeds the threshold. Needs to be updated with GPS.
  function checkMovement() {
    if (movement_change >= movement_threshold) {
      sethasMoved(true);
      window.current_coordinates = 5000;
    }
  }
  
  //Checks if user has moved below the threshold. Needs to be updated with GPS.
  function checkStopped() {
    if (movement_change <= stopped_threshold) {
      sethasStopped(true);
      window.current_coordinates = 5000;
    }
  }

  //This is used for tracking movement, and prompts the user to say why they have moved every 5 seconds.
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

  return () => {
    clearTimeout(timer_stopped);
  }}, [hasStopped]);

  //This is used to continually log the users location
  useEffect( () => {
    const timer = setInterval( () => {writePositionData(UserId, current_coordinates)}, position_time_interval);

    return () => {
      clearInterval(timer);
    }
  }, []);

  const [last, setLast] = useState("No locations visited yet")
  onValue(locationRef, (snapshot) => {
    var visited_locations = listOfLocationsVisited(snapshot); //Returns an array of the names of the locations visited
    var last_10_locations = getLastLocationsVisited(visited_locations, 10);
  
    console.log("On value outputs");
    console.log(visited_locations); //Used for debugging, remove when locations are displayed to the user in the app
    console.log(last_10_locations); //Same as above.
    console.log(snapshot);
    window.last_10_locations = last_10_locations;
    let last_location = getLastLocationsVisited(visited_locations, 1);
    console.log("End of on value outputs");
  });

  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/${UserId}/locations_visited`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(listOfLocationsVisited(snapshot));
      console.log("Get method output");
    } else {
      console.log("No data avaliable.");
    }
  }).catch((error) => {
    console.log(error);
  })

  //This set of code below successfully updates with the last location visited
  const [tasks, setTasks] = useState("");

  useEffect( () => {
    return onValue(locationRef, querySnapShot => {
      let data = querySnapShot || {};
      let items = listOfLocationsVisited(data);
      let last_item = getLastLocationsVisited(items, 1);
      setTasks(last_item);
    })
  }, []);
  //THIS SECTION ABOVE!!!!!!!!!!!!!!!!!!!!!

  //This creates the view that the user sees when they open the app
  return (
    <View style={styles.container}>
      <Modal animationType='slide' visible={hasMoved}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Please fill out your reason for moving:</Text>
            <TextInput
              value={movement}
              placeholder="Reason for Movement"
              onChangeText={(movement) => setMovement(movement)}
            ></TextInput>
            <Button title="Send Data!" 
            onPress={() => {
              sethasMoved(false);
              reasonForMovement(UserId, movement, current_coordinates);
              }}></Button>
            <Button title="I didn't move!" onPress={() => sethasMoved(false)}></Button>
          </View>
        </View>
      </Modal>

      <Modal animationType='slide' visible={hasStopped}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Please fill out where you have stopped:</Text>
            <TextInput
              value={location}
              placeholder="Where you have stopped"
              onChangeText={(location) => setLocation(location)}
            ></TextInput>
            <Button title="Send Data!" 
            onPress={() => {
              sethasStopped(false);
              writeLocationData(UserId, location, current_coordinates);
              }}></Button>
            <Button title="I didn't stop!" onPress={() => sethasStopped(false)}></Button>
          </View>
        </View>
      </Modal>

      <Text>{tasks}</Text>
      <Text></Text>
      <Button title="Send Data!" onPress={() => { writeUserData("user01", "Cam", "fake@fake.com", "google.com") }}></Button>
      <Button title="Send Location Data!" onPress={() => { writeLocationData("user07", "Work", 10) }}></Button>
      <Button title="Send Position Data!" onPress={() => { writePositionData("user04", 1000) }}></Button>
      <Button title="Send Data on how you moved between two locations!" onPress={() => { writeMovementData("user04", "Home", "Gym", 10, 100, "Car") }}></Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2
  }
});

export default App