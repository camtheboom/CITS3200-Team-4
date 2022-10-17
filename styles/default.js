//The stylesheet used over the various pages in the app

import { StyleSheet } from 'react-native';
const {width} = Dimensions.get('window');
import {Dimensions} from 'react-native';


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
    },
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A9A9A9',
        padding: 10,
        borderRadius: 10,
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
    div: {
        flex:3
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
    shadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
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
    },
    
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
      } 
  
    
});

export default styles;
