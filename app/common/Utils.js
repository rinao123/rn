import { Dimensions, PixelRatio } from "react-native";

var designWidth = 1366;

function getScreenWidth() {
    return Dimensions.get("window").width;
}

function getScreenHeight() {
    return Dimensions.get("window").height;
}

function px2dp(px) {
    let pixelRatio = PixelRatio.get();
    return Math.max(Math.round(getScreenWidth() / (designWidth / pixelRatio) * px / pixelRatio), 1);
}

export default {
    getScreenWidth: getScreenWidth,
    getScreenHeight: getScreenHeight,
    px2dp: px2dp
}