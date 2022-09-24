import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device'; import * as Location from 'expo-location';

export default function location() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
