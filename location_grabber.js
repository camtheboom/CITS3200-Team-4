import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TextInput, Pressable, View, Alert } from 'react-native';
import * as Location from "expo-location";

export default class Grabber extends React.Component {

    state = {
        errorMessage: "",
        location: {}
    }

    getAddress() {
        return this.state.address
    }

    _getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("PERMISSION LACK!")
            this.setState({
                errorMessage: "PERMISSION NOT GRANTED"
            });
        }
        console.log("there")
        const userLocation = await Location.getCurrentPositionAsync();
        console.log("here")
        console.log(JSON.stringify(userLocation))
        this.setState({
            location: userLocation
        })
    }

    render() {
        this._getLocation()

        return (
            <View>
                <Text>Salut</Text>
            </View>
        );
    }
}

