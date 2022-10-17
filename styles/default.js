//The stylesheet used over the various pages in the app

import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigcontainer: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
      input: {
        height:40,
        borderColor: 'black',
        borderWidth: 2
    },
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202b73',
        padding: 10,
        borderRadius: 20,
        width: 250,
        marginTop: 10,
        marginBottom: 10,
        height: 100,
        flex: 1,
        color: '#384bc7'
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
        flex: 1
    },
      modalButton: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width:300
    },
    redmodalButton: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width:300,
        color: 'red'
    },
    div3: {
        flex:3
    },
    div1: {
        flex:1
    },
    startbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 20,
        width: 250,
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
            height: 2
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
        marginTop: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
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
    },
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
        backgroundColor: '#FFF'
    },
    creditText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'

    },
    creditView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3853D4'

    }
});

export default styles;

// navy colour hex code
// #202b73