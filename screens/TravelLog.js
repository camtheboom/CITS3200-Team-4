import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
export default function TravelLog() {
  const newTaskData = [{
    title: "Past Logs",
    //data: manualLog
    data: [
      {
        desciption: 'skrdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        start_location: 'gym',
        end_location: 'home',
        method_of_movement:'car'
      },
      {
        desciption: 'a',
        start_location: 'gym',
        end_location: 'home',
        method_of_movement:'car'
      },
      {
        desciption: 'descfweifwe',
        start_location: 'gym',
        end_location: 'home',
        method_of_movement:'car'
      },
      {
        desciption: 'sdmaskdasmdm',
        start_location: 'gym',
        end_location: 'home',
        method_of_movement:'car'
      },
      {
        desciption: 'dsdsadasda',
        start_location: 'gym',
        end_location: 'home',
        method_of_movement:'car'
      },
    ]
  }];
  return (
    <View style={styles.container}>
      <SectionList
        sections={[...newTaskData]}
        renderItem={({item})=>(
            <Text style={styles.taskItem}> 
            Mode of Transport: {item.method_of_movement} {'\n'}
            Start Location: {item.start_location} {'\n'}
            End Location: {item.end_location} {'\n'}
            Description: {item.desciption} 
            </Text>
        )}
        
        renderSectionHeader={({section})=>(
          <Text style={styles.taskTitle}>{section.title}</Text>
        )}
        keyExtractor={item=>item.id}
        stickySectionHeadersEnabled
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eafffe'
  },
  taskItem:{
    padding: 10,
    marginVertical: 15,
    fontSize: 16
  },
  taskTitle:{
    backgroundColor: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10
  }
});
