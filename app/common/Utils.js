import { Dimensions, PixelRatio } from "react-native";

var designWidth = 1366;

function getScreenWidth() {
    console.log("rinao getScreenWidth dp:" + Dimensions.get("window").width);
    console.log("rinao getScreenWidth px:" + PixelRatio.getPixelSizeForLayoutSize(Dimensions.get("window").width));
    return Dimensions.get("window").width;
}

function getScreenHeight() {
    console.log("rinao getScreenHeight dp:" + Dimensions.get("window").height);
    console.log("rinao getScreenHeight px:" + PixelRatio.getPixelSizeForLayoutSize(Dimensions.get("window").height));
    return Dimensions.get("window").height;
}

function px2dp(px) {
    let pixelRatio = PixelRatio.get();
    return Math.max(Math.round(getScreenWidth() / (designWidth / pixelRatio) * px / pixelRatio), 1);
}

function formatPriceWithoutLastZero(price) {
    if (typeof price == "number") {
        price = price.toFixed(2);
    }
    if (typeof price == "string") {
        return parseFloat(price);
    } else {
        return price;
    }
}

export default {
    getScreenWidth: getScreenWidth,
    getScreenHeight: getScreenHeight,
    px2dp: px2dp,
    formatPriceWithoutLastZero: formatPriceWithoutLastZero
}