//The stylesheet used over the various pages in the app

import { StyleSheet } from 'react-native';
const {width} = Dimensions.get('window');
import {Dimensions} from 'react-native';

// Stylesheet used throughout the app to improve the looks of the app
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, //Container to house content in the middle of the screen instead of from the exact top
    bigcontainer: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, //Big container - used to house more important content. Used on the login screen
      input: {
        height:40,
        borderColor: 'black',
        borderWidth: 2 //Input bar for the login screen and welcome modal
    },
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202b73',
        padding: 10,
        borderRadius: 20,
        width: 250,
        marginTop: 10,
        height: 100,
        flex: 1,
        color: '#384bc7' //Generic button design used throughout the app
    },
      redbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 20,
        width: 250,
        marginTop: 10,
        height: 100,
        flex: 1 //Red button used to cancel or stop events from occurring
    },
      modalButton: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width:300 //Modal button used in the pre-autolog screen
    },
    redmodalButton: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width:300,
        color: 'red' //red modal button - deprecated
    },
    div3: {
        flex:3 //Used to generate a large amount of space in the screen, align content properly
    },
    div1: {
        flex:1
    }, //Used to generate a small amount of space between elements on the page
    startbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 20,
        width: 250,
        flex: 1 //Green button used to start events
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22 //Deprecated container view - use container instead
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2 //Used for the modal in the pre-autolog screen
    },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        marginTop: 10 //Deprecated button styles - use button instead
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center" //Style of the text in the buttons used throughout the app.
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }, //Style of text used in the pre-autolog modal

    shadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10, //Shadow used to differentiate modal content from the content behind it
    },
    header: {
        flexDirection: 'row',
        width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6', //Unused header styling for the pre-autolog modal
    },
    headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
    saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
    viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '10%',
        paddingBottom: '20%',
    }, //Styling for the drop down menus in the manual log section

    //Following styles are for the manual log drop down menu
    
    dropdown1BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  
    textBoxLocation: {
        top: -170,
        flexwrap: "row"

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
      },

    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        // blue colour
        color: '#202b73'
        //Header for pages - used to differentiate between pages
    },
    logInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        width: 300,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        padding: 10,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    }, //Style of text input areas on the login screen.
    welcomeInput: {
        borderColor: 'black',
        borderWidth: 2,
        width: 300,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        padding: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF' //Style of text input areas on the welcome modal - slightly smaller input fields.
    },
    creditText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold' //Style used for credits on login screen

    },
    creditView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3853D4' //Unused credit view - used to display credits on the login screen

    }
});

export default styles;

// navy colour hex code
// #202b73

