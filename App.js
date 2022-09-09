import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Button, Alert, Modal , TextInput, ScrollView } from 'react-native';
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import firebaseConfig from "./firebase.config";
import { writeUserData, writeLocationData, writePositionData, listOfLocationsVisited, writeMovementData} from "./database";



///////////////////////////////////////////////////////Global Variables///////////////////////////////////////////////////////
const fire = initializeApp(firebaseConfig); //Initialises the database
const UserId = 'user07'; 
const db = getDatabase();
///////////////////////////////////////////////////////Global Variables///////////////////////////////////////////////////////



//This function returns the last X visited locations, where X is the number_of_locations.
function getLastLocationsVisited(visited_locations, number_of_locations){
  if(number_of_locations > visited_locations.length){
    return(visited_locations);
  } else {
    const index = -1*number_of_locations;
    const last_locations = visited_locations.slice(index);
    return(last_locations);
  }
};

//This adds an event listener to the locations visited by the user. This runs once when the app starts, and then any time a new location is visited.
const locationRef = ref(db, 'users/' + UserId + '/locations_visited/');
onValue(locationRef, (snapshot) => {
  var visited_locations = listOfLocationsVisited(snapshot); //Returns an array of the names of the locations visited
  var last_10_locations = getLastLocationsVisited(visited_locations, 10);

  console.log(visited_locations); //Used for debugging, remove when locations are displayed to the user in the app
  console.log(last_10_locations); //Same as above.
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

  const test_list = ["Location1", "Location2", "Location3"]
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
      <View>
        {test_list.map((item) => {
          return(
            <View>
              <Text>{item}</Text>
            </View>
          );
        })}
      </View>
      <Text>Welcome to the Human Movement Mapping Project App!</Text>
      <Text></Text>
      <Button title = "Send Data!" onPress={ () => {writeUserData("user01", "Cam", "fake@fake.com", "google.com")}}></Button>
      <Button title = "Send Location Data!" onPress={ () => {writeLocationData("user07", "Home", 10)}}></Button>
      <Button title = "Send Position Data!" onPress={ () => {writePositionData("user04", 1000)}}></Button>
      <Button title = "Send Data on how you moved between two locations!" onPress={ () => {writeMovementData("user04", "Home", "Gym", 10, 100, "Car")}}></Button>
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