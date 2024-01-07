import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { styles } from '../styles/app.style';
import { useImageSliderContext } from '../common/context/ImageSliderContext';
import { useSettingsContext } from '../common/context/SettingsContext';
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import { BlurView } from '@react-native-community/blur';


const ImageList: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [animationStyle, setAnimationStyle] = useState({});
    const doublePressThreshold = 300; // Adjust as needed (milliseconds)
    const [lastPressTime, setLastPressTime] = useState(0);

    const { fetchImagesFromDirectory, selectedFolderUris, shuffledImages, imagePaths, preloadedArray, setShuffledImages, toggleSidebar } = useImageSliderContext();
    const { current_timer, animation_timer, current_transition } = useSettingsContext();

    // Use refs for animated values
    const imageOpacity = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        console.log('✌️"hello" --->', selectedFolderUris);
        fetchImagesFromDirectory();
        // setAnimationStyle(")
    }, [selectedFolderUris]);


    useEffect(() => {

        console.log('✌️shuffledImages --->', shuffledImages);
        if (shuffledImages.length > 0) {
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
        }
    }, [shuffledImages]);


    useEffect(() => {
        if (currentImageIndex === 0
            // && preloadedArray.length == imagePaths.length
        ) {
            // If we've reached the end of the images, shuffle the array
            // shuffleArray();
            console.log('✌️imagePaths --->', imagePaths);
            shuffleArray(imagePaths);
        }
    }, [currentImageIndex, imagePaths
        // , preloadedArray
    ]);

    // const shuffleArray = (array:string[]) => {
    const shuffleArray = (array: string[]) => {
        // Create a copy of the original array
        const shuffledArray = [...array];
        // const shuffledArray = [...shuffledImages];
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
        imageOpacity.setValue(0);

        // Start the fade-in animation for both images
        Animated.parallel([
            Animated.timing(imageOpacity, {
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

            Animated.timing(imageOpacity, {
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

            <Animated.View style={[{ width: '100%', height: '100%' }, { opacity: !current_transition || current_transition != "no_animation" ? imageOpacity : 1 }]}>

                <FastImage
                    source={{ uri: shuffledImages[currentImageIndex], priority: FastImage.priority.high, }}
                    // source={{ uri: imagePaths[shuffledImages[currentImageIndex]] }}
                    style={[styles.backgroundImage]}
                    resizeMode={FastImage.resizeMode.cover}

                />

                <BlurView
                    style={[styles.backgroundImage, styles.blurOverlay]}
                    blurType="light"
                    blurAmount={10}
                    blurRadius={10}
                />
                <FastImage
                    source={{ uri: shuffledImages[currentImageIndex] }}
                    // source={{ uri: imagePaths[shuffledImages[currentImageIndex]] }}
                    style={[styles.topImage]}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </Animated.View>
        </TouchableWithoutFeedback>

    );
};

export default ImageList;
