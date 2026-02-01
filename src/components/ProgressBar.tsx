import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

type Props = {
    progress: number; // 0–1
};

export const ProgressBar = ({ progress }: Props) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progress,
            duration: 400,
            useNativeDriver: false, // width can't use native driver
        }).start();
    }, [progress]);

    const width = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bar, { width }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 10,
        backgroundColor: "#ddd",
        borderRadius: 5,
        overflow: "hidden",
    },
    bar: {
        height: "100%",
        backgroundColor: "#2196F3",
    },
});
