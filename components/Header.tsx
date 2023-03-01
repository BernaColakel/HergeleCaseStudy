import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Color from "../constants/Color";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import navigationKeys from "../constants/navigationKeys";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(navigationKeys.Support)} >
            <MaterialCommunityIcons name="menu" size={30} color={Color.supportScreen.tint_Color} />
        </TouchableOpacity>
    )
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        backgroundColor: Color.background.background,
        borderRadius: 10,

    },
})