import { Dimensions, PixelRatio } from "react-native";

var designWidth = 1366;

function getScreenWidth() {
    console.log("rinao width dp:" + Dimensions.get("window").width);
    console.log("rinao width px:" + PixelRatio.getPixelSizeForLayoutSize(Dimensions.get("window").width));
    return Dimensions.get("window").width;
}

function getScreenHeight() {
    console.log("rinao height dp:" + Dimensions.get("window").height);
    console.log("rinao height px:" + PixelRatio.getPixelSizeForLayoutSize(Dimensions.get("window").height));
    return Dimensions.get("window").height;
}

function px2dp(px) {
    let pixelRatio = PixelRatio.get();
    return getScreenWidth() / (designWidth / pixelRatio) * px / pixelRatio;
}

export default {
    getScreenWidth: getScreenWidth,
    getScreenHeight: getScreenHeight,
    px2dp: px2dp
}