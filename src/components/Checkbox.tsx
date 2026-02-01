import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

type Props = {
    checked: boolean;
    onChange: (value: boolean) => void;
};

export const Checkbox = ({ checked, onChange }: Props) => {
    return (
        <Pressable
            onPress={() => onChange(!checked)}
            style={styles.container}
        >
            <View style={[styles.box, checked && styles.checkedBox]}>
                {checked && <View style={styles.inner} />}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 4,
    },
    box: {
        width: 22,
        height: 22,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#555",
        alignItems: "center",
        justifyContent: "center",
    },
    checkedBox: {
        borderColor: "#4CAF50",
    },
    inner: {
        width: 12,
        height: 12,
        backgroundColor: "#4CAF50",
        borderRadius: 2,
    },
});
