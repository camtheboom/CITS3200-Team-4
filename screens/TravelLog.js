import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
  
const TravelLog = () => {
  const route = useRoute();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>please work</Text>
    </View>
  );
};

export default TravelLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 50,
  },
});
