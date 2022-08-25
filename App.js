import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Modal , TextInput } from 'react-native';
import React, { useState } from "react";

const App = () => {
  const [isOKAY, setisOKAY] = useState(false);

  const Warning = () =>
    Alert.alert(
      "Data Collection Alert",
      "This app may collect personal data such as location and heart rate.",
      [
        { text: "Cancel", onPress: () => setisOKAY(false)},
        { text: "OK", onPress: () => setisOKAY(true)}
      ]
    );

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
      <Button title = "Click Here to get Started!" onPress={Warning}></Button>
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