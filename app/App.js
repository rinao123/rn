import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Animated, Easing } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from "./pages/Splash";
import Index from "./pages/Index";
import Cart from "./pages/Cart";

const AppNavigator = createStackNavigator(
  {
    Splash: { screen: Splash },
    Index: { screen: Index },
    Cart: { screen: Cart }
  },
  {
    initialRouteName: "Index",
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
      <View style={styles.container}>
        <StatusBar translucent={true} hidden={false} animated={true} />
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
