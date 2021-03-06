import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Animated, Easing } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import store from "./redux/store";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import SoldOut from "./pages/SoldOut";
import Printer from "./pages/Printer";

const AppNavigator = createStackNavigator(
    {
        Splash: { screen: Splash },
        Login: { screen: Login },
        Home: { screen: Home },
        Menu: { screen: Menu },
        SoldOut: { screen: SoldOut },
        Printer: { screen: Printer }
    },
    {
        initialRouteName: "Login",
        transitionConfig: () => ({
            transitionSpec: {
                duration: 500,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const width = layout.initWidth;
                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [width, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateX }] };
            },
        })
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar hidden={true} />
                    <AppContainer />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
