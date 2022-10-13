import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps';


const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
let foregroundSubscription = null

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.error(error)
        return
    }
    if (data) {
        // Extract location coordinates from data
        const { locations } = data
        const location = locations[0]
        if (location) {
            console.log("Location in background", location.coords)
        }
    }
})

function Profile() {
    const [mapRegion, setmapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // Define position state: {latitude: number, longitude: number}
    const [position, setPosition] = useState({})
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
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
            >
            </MapView>
        </View>
    );
};
export default Profile;

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.90,
    },
    heading: {
        alignSelf: 'center',
        paddingTop: 20,
        marginBottom: 10,
        fontSize: 24
    },
});
