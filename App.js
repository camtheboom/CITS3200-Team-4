import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Modal , TextInput } from 'react-native';
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-RiwBX8Si5IKxjIt7GgVTy7TNxf-hq4E",
  authDomain: "human-movement-mapping.firebaseapp.com",
  databaseURL: "https://human-movement-mapping-default-rtdb.firebaseio.com",
  projectId: "human-movement-mapping",
  storageBucket: "human-movement-mapping.appspot.com",
  messagingSenderId: "262748753205",
  appId: "1:262748753205:web:22aff0982462db9ccb907c",
  measurementId: "G-QB5JMW811H"
};

const fire = initializeApp(firebaseConfig);

function writeUserData(UserId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + UserId + "/location"), {
    username: name,
    email: email,
    profile_picture: imageUrl
  });
};



//This function stores the name of the location visited, as well as its GPS coordinates and the time of the visit
function writeLocationData(UserId, location_name, coordinates) {
  const db = getDatabase();
  const current_time = Date();

  const reference = ref(db, 'users/' + UserId + '/locations_visited'); //Specifies the parent node
  const pushReference = push(reference); //This will generate a unique key based on the timestamp, meaning the locations will be ordered in the order they are visited

  set(pushReference, {
    location_name: location_name,
    coordinates: coordinates,
    time: current_time
  });
};

//This function will store the coordinates of the user, as well as the current time. This should be called when recording the users position.
function writePositionData(UserId, coordinates) {
  const db = getDatabase();
  const current_time = Date();

  const reference = ref(db, 'users/' + UserId + '/position_data') //Specifies the parent node
  const pushReference = push(reference); //This will generate a unique key based on the timestamp, meaning the locations will be ordered in the order they are visited

  set (pushReference, {
    coordinate: coordinates,
    time: current_time
  });
};

//This is an event listener which logs the whole set of nodes of locations visited, and its children.
//THIS IS CURRENTLY WHERE I AM UP TO
const UserId = 'user01';
const db = getDatabase();
const locationRef = ref(db, 'users/' + UserId + '/locations_visited/');
const visited_locations = [];
onValue(locationRef, (snapshot) => {
  const data = snapshot.val();
  const props2 = Object.getOwnPropertyNames(data);
  if (Array.isArray(props2)){
    for (let i = 0; i < props2.length; i++){
      visited_locations.push(data[props2[i]].location_name);
    };
    }else {
      console.log(data[props2].location_name);
      console.log("WEWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    }
  console.log(visited_locations);
});

const App = () => {

  //This is used to store whether the user has agreed to have their data stored or not.
  const [isOKAY, setisOKAY] = useState(false);

  //Runs SQL commands to create the tables for the database if they do not already exist.
  //Displays a warning that the app will collect personal data.
  const Warning = () =>
    Alert.alert(
      "Data Collection Alert",
      "This app may collect personal data such as location and heart rate.",
      [
        { text: "Cancel", onPress: () => setisOKAY(false)},
        { text: "OK", onPress: () => setisOKAY(true)}
      ]
    );

  //This creates the view that the user sees when they open the app
  return (
    <View style={styles.container}>
      <Modal animationType='slide' visible={isOKAY}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Please fill out the details below:</Text>
            <TextInput
              style={styles.input}
              defaultValue = "First Name"
            ></TextInput>
            <TextInput
              style={styles.input}
              defaultValue = "Last Name"
            ></TextInput>
            <Button title = "Go back" onPress = {() => setisOKAY(false)}></Button>
          </View>
        </View>
      </Modal>
      <Text>Welcome to the Human Movement Mapping Project App!</Text>
      <Text></Text>
      <Button title = "Send Data!" onPress={ () => {writeUserData("user01", "Cam", "fake@fake.com", "google.com")}}></Button>
      <Button title = "Send Location Data!" onPress={ () => {writeLocationData("user01", "Home", 10)}}></Button>
      <Button title = "Send Position Data!" onPress={ () => {writePositionData("user01", 1000)}}></Button>
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
    height:40,
    borderColor: 'black',
    borderWidth: 2
  }
});

export default App