import React from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Color from "../constants/Color";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import navigationKeys from "../constants/navigationKeys";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Keyboard } from "react-native";

interface HeaderTitleProps {
    title: string;
}
const Header = (props: HeaderTitleProps) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={() => navigate(navigationKeys.Support)} >
                <MaterialCommunityIcons name="menu" size={30} color={Color.supportScreen.tint_Color} />
            </TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
};

export default Header;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        backgroundColor: Color.background.background,
        borderRadius: 10,
        marginRight: 20,
    },
    title: {
        color: Color.supportScreen.text,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
})