import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { styles } from '../styles/app.style';
import { useImageSliderContext } from '../common/context/ImageSliderContext';
import { useSettingsContext } from '../common/context/SettingsContext';
import DocumentPicker from 'react-native-document-picker';


const ImageList: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const doublePressThreshold = 300; // Adjust as needed (milliseconds)
    const [lastPressTime, setLastPressTime] = useState(0);
    const { fetchImagesFromDirectory, selectedFolderUris, shuffledImages, imagePaths, setShuffledImages, toggleSidebar } = useImageSliderContext();
    const { current_timer, animation_timer } = useSettingsContext();

    // Use refs for animated values
    const backgroundOpacity = useRef(new Animated.Value(0)).current;
    const topImageOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        console.log('✌️"hello" --->', selectedFolderUris);
        fetchImagesFromDirectory();
        // await pickFile();
    }, [selectedFolderUris]);


    useEffect(() => {
        if (shuffledImages.length > 0) {
            preloadImages(shuffledImages).then(() => {
                fadeInImages();
                const interval = setInterval(() => {
                    // Increment the image index or reset to 0 if it reaches the end
                    setCurrentImageIndex((prevIndex) =>
                        prevIndex === shuffledImages.length - 1 ? 0 : prevIndex + 1
                    );

                    // Start the fade-in animation for both images
                    fadeInImages();
                }, (Number(current_timer) * 1000) + ((Number(animation_timer) * 1000) * 2)); // 5000 milliseconds = 5 seconds

                return () => clearInterval(interval); // Cleanup the interval when the component unmounts
            });
        }
    }, [shuffledImages]);


    useEffect(() => {
        if (currentImageIndex === 0) {
            // If we've reached the end of the images, shuffle the array
            shuffleArray(imagePaths);
        }
    }, [currentImageIndex, imagePaths]);

    const preloadImages = async (imageArray: string[]) => {
        const preloadPromises = imageArray.map(async (imageUri) => {
            await Image.prefetch('file://' + imageUri);
        });

        return Promise.resolve(preloadPromises);
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

            Animated.timing(topImageOpacity, {
                toValue: 1,
                duration: animation_timer * 1000,
                useNativeDriver: false,
            }),
            Animated.timing(backgroundOpacity, {
                toValue: 1,
                duration: animation_timer * 1000,
                useNativeDriver: false,
            }),
        ]).start(() => {
            setTimeout(() => fadeOutImages(), current_timer * 1000); // Delay of 4.5 seconds for a total of 5 seconds
        });
    };


    const fadeOutImages = () => {
        // Start the fade-out animation for both images
        Animated.parallel([

            Animated.timing(topImageOpacity, {
                toValue: 0,
                duration: animation_timer * 1000,
                useNativeDriver: false,
            }),
            Animated.timing(backgroundOpacity, {
                toValue: 0,
                duration: animation_timer * 1000,
                useNativeDriver: false,
            }),
        ]).start();
    };


    const handleViewPress = () => {
        const currentTime = Date.now();
        const timeSinceLastPress = currentTime - lastPressTime;

        if (timeSinceLastPress < doublePressThreshold) {
            // Double press detected
            toggleSidebar();
        }

        setLastPressTime(currentTime);
    };

    return (
        <TouchableWithoutFeedback onPress={handleViewPress} style={{ width: "100%", height: "100%" }}>

            <View style={{ width: "100%", height: "100%" }}>
                {/* <Image
                    source={{ uri: 'file://' + shuffledImages[currentImageIndex] }}
                    style={[styles.topImage]}

                /> */}
                <Animated.Image
                    source={{ uri: shuffledImages[currentImageIndex] }}
                    style={[styles.backgroundImage, { opacity: backgroundOpacity }]}
                    blurRadius={10}
                />
                <Animated.Image
                    source={{ uri: shuffledImages[currentImageIndex] }}
                    style={[styles.topImage, { opacity: topImageOpacity }]}
                />
            </View>
        </TouchableWithoutFeedback>

    );
};

export default ImageList;
