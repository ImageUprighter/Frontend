import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableWithoutFeedback, Animated, Image, StyleSheet } from 'react-native';
import { styles } from '../styles/app.style';
import { useImageSliderContext } from '../common/context/ImageSliderContext';
import { useSettingsContext } from '../common/context/SettingsContext';

const ImageList: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const doublePressThreshold = 300;
    const [lastPressTime, setLastPressTime] = useState(0);

    const { fetchImagesFromDirectory, selectedFolderUris, shuffledImages, imagePaths, setShuffledImages, toggleSidebar } = useImageSliderContext();
    const { current_timer, animation_timer, current_transition } = useSettingsContext();

    const imageOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchImagesFromDirectory();
    }, [selectedFolderUris]);

    useEffect(() => {
        if (shuffledImages.length > 0) {
            fadeInImages();
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === shuffledImages.length - 1 ? 0 : prevIndex + 1
                );
                fadeInImages();
            }, (Number(current_timer) * 1000) + ((Number(animation_timer) * 1000) * 2));

            return () => clearInterval(interval);
        }
    }, [shuffledImages]);

    useEffect(() => {
        if (currentImageIndex === 0 && imagePaths.length > 0) {
            shuffleArray(imagePaths);
        }
    }, [currentImageIndex, imagePaths]);

    // const shuffleArray = (array:string[]) => {
    const shuffleArray = (array: string[]) => {
        const shuffledArray = [...array];
        let currentIndex = shuffledArray.length;
        let randomIndex, tempValue;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            tempValue = shuffledArray[currentIndex];
            shuffledArray[currentIndex] = shuffledArray[randomIndex];
            shuffledArray[randomIndex] = tempValue;
        }
        setShuffledImages(shuffledArray);
    };

    const fadeInImages = () => {
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

    const currentUri = shuffledImages[currentImageIndex];

    return (
        <TouchableWithoutFeedback onPress={handleViewPress}>
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        { flex: 1 },
                        { opacity: !current_transition || current_transition !== "no_animation" ? imageOpacity : 1 }
                    ]}
                >
                    {/* BACKGROUND BLURRED IMAGE (Replaces BlurView) */}
                    <Image
                        source={{ uri: currentUri }}
                        style={[StyleSheet.absoluteFill, styles.backgroundImage]}
                        resizeMode="cover"
                        blurRadius={15} // Adjust this number for blur intensity
                    />

                    {/* OPTIONAL LIGHT OVERLAY (To mimic "light" blurType) */}
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />

                    {/* FOREGROUND IMAGE */}
                    <Image
                        source={{ uri: currentUri }}
                        style={[StyleSheet.absoluteFill, styles.topImage]}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ImageList;
