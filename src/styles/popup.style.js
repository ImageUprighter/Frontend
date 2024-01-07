import { StyleSheet, Dimensions } from 'react-native';

export const popupStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', // Align everything at the bottom
    },
    showModalButton: {
        backgroundColor: 'blue',
        padding: 20,
        alignItems: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent gray overlay
        justifyContent: 'flex-end', // Align modal at the bottom
    },
    modalContent: {
        // position:'absolute',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: "90%"
    },
    modalText: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeModalButton: {
        backgroundColor: 'rgb(0, 178, 162)',
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        width: '50%',
        borderRadius: 20,
        // borderBottomRightRadius: 20,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    selectedItem: {
        backgroundColor: 'lightblue',
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    timesButton: {
        position: 'relative',
        right: 15,
        top: 15,
        padding: 5,
        // backgroundColor: 'white',
        borderRadius: 100,
    },
});