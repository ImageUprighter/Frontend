import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TextStyle, SafeAreaView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';


interface LoadingProps {
    size: number; // Replace 'any' with the appropriate navigation type
    text?: String;
    direction?: "row" | "column";
    textStyle?: TextStyle;
    buttonClick?: any;
    buttonStyle?: any;
    textButtonStyle?: TextStyle;
}

const Loader: React.FC<LoadingProps> = ({ size, text, direction = "column", textStyle, buttonClick, buttonStyle, textButtonStyle }) => {

    return (
        <SafeAreaView
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styles.pageContainer, {
                flexDirection: direction
            }]}
        >
            <FastImage
                style={{ width: size, height: size, alignSelf: "center" }}
                source={require("../../assets/hourGlass.gif")}
                resizeMode={FastImage.resizeMode.contain}
            />

            {text ? <Text style={textStyle}>{text}</Text> : null}
            <TouchableOpacity onPress={buttonClick} style={buttonStyle}>
                <Text style={textButtonStyle}>Pick Folder</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    pageContainer: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "white",
        position: "absolute",
        height: Dimensions.get("screen").height,
        width: "100%",
        zIndex: 999999,
        // elevation: 1

    }

});
export default Loader;