import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: 'black',
    height: '100%',
    flex:1,
    alignItems: 'center',
    verticalAlign:'center'
  },

  HomePageContainer: {
    height: '100%',
    padding:'2%',
    width:'100%',
    flex: 1,
    alignItems: 'center',
    verticalAlign:'center'
  },
  sectionTitle: {
    fontSize: height/8,
    fontWeight: '600',
    alignItems: 'center',
  },

  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundImage: {
    flex: 1, // Take up the entire screen
    resizeMode: 'cover', // Cover the entire screen while maintaining aspect ratio
    justifyContent: 'center', // Center the top image vertically
    alignItems: 'center', // Center the top image horizontally
    height: '100%',
    width: width,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha (last value) for the desired transparency
  },
  topImage: {
    flex:1,
    height: '100%', // Adjust the width as needed (80% of the screen width in this example)
    width: '100%', // Adjust the width as needed (80% of the screen width in this example)
    aspectRatio: 1, // Maintain the aspect ratio (1:1 in this example)
    position: 'absolute', // Position the top image absolutely
    resizeMode: 'contain', // Cover the entire screen while maintaining aspect ratio
    justifyContent: 'center', // Center the top image vertically
    alignItems: 'center', // Center the top image horizontally
    top: 0,
  },
});