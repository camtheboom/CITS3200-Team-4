import { getDatabase, ref, onValue, set, push, get, child } from "firebase/database";

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

//This function takes a 'snapshot' of the data in the locations_visited node in our database, and returns an array of the location names
function listOfLocationsVisited(snapshot){
    const data = snapshot.val(); //Extracts all the locations visited
    const visited_locations = [];
  
    if (data == null){ //Checks if the user has not visited any locations yet, and returns an empty array if so
      return(visited_locations);
    };
  
    const locations = Object.getOwnPropertyNames(data); //Returns the name of each node corresponding to a visited location
  
    if (Array.isArray(locations)){
      for (let i = 0; i < locations.length; i++){
        visited_locations.push(data[locations[i]].location_name); //Adds each location name to the array
      };
    };
    return(visited_locations);
};

function getManualLog(UserId){
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${UserId}/manual_log`)).then((snapshot) => {
    if (snapshot.exists()) {
      const listResponses = getListOfManualLog(snapshot);
      return(listResponses);
    } else {
      console.log("No data avaliable")
    }
  }).catch((error) => {
    console.log(error);
  });
}

function getListOfManualLog(snapshot){
  const data = snapshot.val();
  const listOfResponses = [];

  if (data == null){
    return(listOfResponses);
  };

  const responses = Object.getOwnPropertyNames(data);
  for (let i = 0; i< responses.length; i++){
    let response = data[responses[i]];
    listOfResponses.push(response);
  }
  return(listOfResponses);
};

//This function saves to the database a starting and finishing location, and the method of transport used to move between them (E.g. car, walking, bus, etc.)
function writeMovementData(UserId, start_location, end_location, start_coordinates, end_coordinates, method_of_movement){
  const db = getDatabase();
  const reference = ref(db, 'users/' + UserId + '/movement_data');
  const pushReference = push(reference);

  set (pushReference, {
    start_location: start_location,
    end_location: end_location,
    start_coordinates: start_coordinates,
    end_coordinates: end_coordinates,
    method_of_movement: method_of_movement
  });
};

function reasonForMovement(UserId, reason, coordinates){
  const db = getDatabase();
  const reference = ref(db, 'users/' + UserId + '/reason_for_movement');
  const pushReference = push(reference);

  set (pushReference, {
    reason: reason,
    coordinates: coordinates
  });
};

function writeManualLog(UserId, start_location, end_location, description, method_of_movement){
  const db = getDatabase();
  const reference = ref(db, 'users/' + UserId + '/manual_log');
  const pushReference = push(reference);

  set (pushReference, {
    start_location: start_location,
    end_location: end_location,
    description: description,
    method_of_movement: method_of_movement
  });
};

function writePersonalInfo(UserId, age, weight, gender){
  const db = getDatabase();
  const reference = ref(db, 'users/' + UserId + '/personal_information');
  const pushReference = push(reference);

  set (pushReference, {
    age: age,
    weight: weight,
    gender: gender
  });
};



export { writeUserData, writeLocationData, writePositionData, listOfLocationsVisited, writeMovementData, reasonForMovement, writeManualLog, getListOfManualLog, writePersonalInfo };