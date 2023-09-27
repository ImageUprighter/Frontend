import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native';
import { styles } from '../styles/app.style';
import { imageSliderStore } from '../stores/ImageSlider.store';
import { settingsStore } from '../stores/Settings.store';
import { observer } from 'mobx-react';


interface ImageListProps {
    navigation: any;
}


const ImageList: React.FC<ImageListProps> = observer(({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const doublePressThreshold = 300; // Adjust as needed (milliseconds)
    const [lastPressTime, setLastPressTime] = useState(0);

    // Use refs for animated values
    const backgroundOpacity = useRef(new Animated.Value(0)).current;
    const topImageOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        imageSliderStore.fetchImagesFromDirectory();
    }, [imageSliderStore.selectedFolderUris]);


    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the image index or reset to 0 if it reaches the end
            setCurrentImageIndex((prevIndex) =>
                prevIndex === imageSliderStore.shuffledImages.length - 1 ? 0 : prevIndex + 1
            );

            // Start the fade-in animation for both images
            fadeInImages();
        }, settingsStore.currentTimer + (settingsStore.animationTimer * 2)); // 5000 milliseconds = 5 seconds

        return () => clearInterval(interval); // Cleanup the interval when the component unmounts
    }, [imageSliderStore.shuffledImages]);


    useEffect(() => {
        if (currentImageIndex === 0) {
            // If we've reached the end of the images, shuffle the array
            shuffleArray(imageSliderStore.imagePaths);
        }
    }, [currentImageIndex, imageSliderStore.imagePaths]);


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

        imageSliderStore.updateShuffledImages(shuffledArray);
    };


    const fadeInImages = () => {
        // Reset opacity values to 0
        backgroundOpacity.setValue(0);
        topImageOpacity.setValue(0);

        // Start the fade-in animation for both images
        Animated.parallel([
            Animated.timing(backgroundOpacity, {
                toValue: 1,
                duration: settingsStore.animationTimer,
                useNativeDriver: false,
            }),
            Animated.timing(topImageOpacity, {
                toValue: 1,
                duration: settingsStore.animationTimer,
                useNativeDriver: false,
            }),
        ]).start(() => {
            // After 5 seconds, start the fade-out animation for both images
            setTimeout(() => fadeOutImages(), settingsStore.currentTimer); // Delay of 4.5 seconds for a total of 5 seconds
        });
    };


    const fadeOutImages = () => {
        // Start the fade-out animation for both images
        Animated.parallel([
            Animated.timing(backgroundOpacity, {
                toValue: 0,
                duration: settingsStore.animationTimer,
                useNativeDriver: false,
            }),
            Animated.timing(topImageOpacity, {
                toValue: 0,
                duration: settingsStore.animationTimer,
                useNativeDriver: false,
            }),
        ]).start();
    };


    const handleViewPress = () => {
        const currentTime = Date.now();
        const timeSinceLastPress = currentTime - lastPressTime;

        if (timeSinceLastPress < doublePressThreshold) {
            // Double press detected
            imageSliderStore.toggleSidebar();
            // console.log('Double press detected!');
        }

        setLastPressTime(currentTime);
    };

    return (
        <TouchableWithoutFeedback onPress={handleViewPress}>

            <View>
                <Animated.Image
                    source={{ uri: 'file://' + imageSliderStore.shuffledImages[currentImageIndex] }}
                    style={[styles.backgroundImage, { opacity: backgroundOpacity }]}
                    blurRadius={10}
                />
                <Animated.Image
                    source={{ uri: 'file://' + imageSliderStore.shuffledImages[currentImageIndex] }}
                    style={[styles.topImage, { opacity: topImageOpacity }]}
                />
            </View>
        </TouchableWithoutFeedback>

    );
});

export default ImageList;
