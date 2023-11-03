import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window')

const vh = height / 100;
const vw = width / 100;

export const sidebarStyle = StyleSheet.create({
    sidebarContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 200, // Adjust the width of your sidebar as needed
        backgroundColor: 'lightgray',
        zIndex: 1,
    },
    timesButton: {
        position: 'absolute',
        right: 15,
        top: 15,
        padding: 5,
        // backgroundColor: 'white',
        borderRadius: 100,
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryButton: {
        fontSize: 8 * vh,
        fontWeight: '600',
        alignItems: 'center',
    },
    closeButton: {
        fontSize: 2 * vh,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
    },
    closeButtonContainer: {
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 10,
    },
    line: {
        height: 1,
        marginVertical: vh * 5,
        backgroundColor: "gray",
        width: '80%',
    }

});