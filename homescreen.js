// Nav Bar Imports

import { Component } from 'react'
import HomeScreen from './screens/Home';
import TravelLogScreen from './screens/TravelLog';
import StatisticsScreen from './screens/Statistics';
import SettingsScreen from './screens/Settings';
import ProfileScreen from './screens/Profile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function Application() {
    return (
        <NavigationContainer>
            <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'black' }}
                activeColor="white" >
                <Tab.Screen name="Home" component={HomeScreen}            //Home Screen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Settings" component={SettingsScreen}      //Settings Screen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cog-outline" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="TravelLog" component={TravelLogScreen}    // TravellogScreen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="map" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Statistics" component={StatisticsScreen}   // Statistics Screen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="chart-line-variant" color={color}
                                size={26} />
                        ),
                    }} />
                <Tab.Screen name="Profile" component={ProfileScreen}   // Profile Screen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color}
                                size={26} />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

//
