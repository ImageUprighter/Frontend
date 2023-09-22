import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native';
import RNFS from 'react-native-fs';
import { styles } from './my_style';

interface ImageListProps {
  directoryPath: string;
  navigation: any;
}

interface ImageFile {
  name: string;
  path: string;
}

const ImageList: React.FC<ImageListProps> = ({ directoryPath, navigation }) => {
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTimer, setCurrentTimer] = useState(5000);
  const [animationTimer, setAnimationTimer] = useState(500);
  const doublePressThreshold = 300; // Adjust as needed (milliseconds)
  const [lastPressTime, setLastPressTime] = useState(0);

  // Use refs for animated values
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const topImageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchImagesFromDirectory(directoryPath);
  }, [directoryPath]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the image index or reset to 0 if it reaches the end
      setCurrentImageIndex((prevIndex) =>
        prevIndex === shuffledImages.length - 1 ? 0 : prevIndex + 1
      );

      // Start the fade-in animation for both images
      fadeInImages();
    }, currentTimer + (animationTimer * 2)); // 5000 milliseconds = 5 seconds

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, [shuffledImages]);

  useEffect(() => {
    if (currentImageIndex === 0) {
      // If we've reached the end of the images, shuffle the array
      shuffleArray(imagePaths);
    }
  }, [currentImageIndex, imagePaths]);

  const fetchImagesFromDirectory = async (path: string) => {
    try {
      const files = await RNFS.readDir(path);

      // Filter and select only image files (you can customize the filter criteria)
      const imageFiles = files.filter((file) =>
        file.name.match(/\.(jpg|jpeg|png|gif)$/i)
      );

      // Extract image file paths
      const imagePaths = imageFiles.map((file: ImageFile) => file.path);

      setImagePaths(imagePaths);
      shuffleArray(imagePaths);
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  const shuffleArray = (array: string[]) => {
    // Create a copy of the original array
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let randomIndex, tempValue;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      tempValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = tempValue;
    }

    setShuffledImages(shuffledArray);
  };

  const fadeInImages = () => {
    // Reset opacity values to 0
    backgroundOpacity.setValue(0);
    topImageOpacity.setValue(0);

    // Start the fade-in animation for both images
    Animated.parallel([
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: animationTimer,
        useNativeDriver: false,
      }),
      Animated.timing(topImageOpacity, {
        toValue: 1,
        duration: animationTimer,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // After 5 seconds, start the fade-out animation for both images
      setTimeout(() => fadeOutImages(), currentTimer); // Delay of 4.5 seconds for a total of 5 seconds
    });
  };

  const fadeOutImages = () => {
    // Start the fade-out animation for both images
    Animated.parallel([
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: animationTimer,
        useNativeDriver: false,
      }),
      Animated.timing(topImageOpacity, {
        toValue: 0,
        duration: animationTimer,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleViewPress = () => {
    const currentTime = Date.now();
    const timeSinceLastPress = currentTime - lastPressTime;

    if (timeSinceLastPress < doublePressThreshold) {
      // Double press detected
      navigation.openDrawer()
      console.log('Double press detected!');
    }

    setLastPressTime(currentTime);
  };

  return (
    <TouchableWithoutFeedback onPress={handleViewPress}>

      <View>
        <Animated.Image
          source={{ uri: 'file://' + shuffledImages[currentImageIndex] }}
          style={[styles.backgroundImage, { opacity: backgroundOpacity }]}
          blurRadius={10}
        />
        <Animated.Image
          source={{ uri: 'file://' + shuffledImages[currentImageIndex] }}
          style={[styles.topImage, { opacity: topImageOpacity }]}
        />
      </View>
    </TouchableWithoutFeedback>

  );
};

export default ImageList;
