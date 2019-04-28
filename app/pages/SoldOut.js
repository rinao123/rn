import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Utils from "../common/Utils";

export default class SoldOut extends Component {
    static navigationOptions = {
        header: null,
        transitionConfig: null
    };
    constructor(props) {
        super(props);

    }
    getMenuItemExtractor = (item, index) => {
        return index;
    }
    render() {
        return (
            <LinearGradient style={styles.container} colors={["#3F8ED3", "#0443AF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#34363A"
    }
});