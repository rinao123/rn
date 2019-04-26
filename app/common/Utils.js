import { Dimensions, PixelRatio } from "react-native";

var designWidth = 750;

function getScreenWidth() {
    return Dimensions.get("window").width;
}

export default {
    designWidth: designWidth,
    getScreenWidth: getScreenWidth
}