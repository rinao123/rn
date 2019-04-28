import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Utils from "../common/Utils";
var menutIcon = require("../resources/images/menu.png");
var subIcon = require("../resources/images/sub.png");
var addIcon = require("../resources/images/add.png");

export default class OrderFood extends Component {
    static navigationOptions = {
        header: null,
        transitionConfig: null
    };
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                { goods_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { goods_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { goods_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { goods_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { goods_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 }
            ]
        };
    }
    onBackClick = () => {
        this.props.navigation.pop();
    }
    onClearClick = () => {

    }
    onSubClick = () => {

    }
    onAddClick = () => {

    }
    onDeleteClick = () => {

    }
    onBalanceClick = () => {

    }
    render() {
        return (
            <LinearGradient style={styles.container} colors={["#3F8ED3", "#0443AF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <View>
                    <TouchableOpacity style={styles.btnBack} activeOpacity={0.8} onPress={this.onBackClick}>
                        <Image style={styles.btnBackIcon} source={menutIcon} />
                        <Text style={styles.btnBackText}>点餐</Text>
                    </TouchableOpacity>
                    <View style={styles.menuView}>
                        <View>
                            <TouchableOpacity style={styles.btnClear} activeOpacity={0.8} onPress={this.onClearClick}>
                                <Image style={styles.btnClearIcon} source={menutIcon} />
                                <Text style={styles.btnClearText}>清空</Text>
                            </TouchableOpacity>
                            <FlatList style={styles.menuList} data={[]} renderItem={({item}) => <Text>{item.key}</Text>}>
                            </FlatList>
                            <View style={styles.menuBottom}>
                            </View>
                            <TouchableOpacity style={styles.btnBalance} activeOpacity={0.8} onPress={this.onBalanceClick}>
                                <Text style={styles.btnBalanceText}>结账</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.menuSide}>
                            <View style={styles.menuSideTop}>
                                <TouchableOpacity style={styles.btnSub} activeOpacity={0.8} onPress={this.onSubClick}>
                                    <Image style={styles.btnOpIcon} source={subIcon} />
                                </TouchableOpacity>
                                <Text style={styles.num}>1</Text>
                                <TouchableOpacity style={styles.btnAdd} activeOpacity={0.8} onPress={this.onAddClick}>
                                    <Image style={styles.btnOpIcon} source={addIcon} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.btnDelete} activeOpacity={0.8} onPress={this.onDeleteClick}>
                                <Text style={styles.btnDeleteText}>删除</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.center}>
                    <View style={styles.centerHeader}>
                        <Text style={styles.foodTitle}>菜单</Text>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#34363A"
    },
    btnBack: {
        flexDirection: "row",
        alignItems: "center",
        height: Utils.px2dp(74)
    },
    btnBackIcon: {
        marginLeft: Utils.px2dp(25),
        width: Utils.px2dp(24),
        height: Utils.px2dp(24)
    },
    btnBackText: {
        marginLeft: Utils.px2dp(10),
        marginRight: Utils.px2dp(10),
        fontSize: Utils.px2dp(24),
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    menuView: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: Utils.px2dp(25),
        width: Utils.px2dp(470),
        height: Utils.getScreenHeight() - Utils.px2dp(99),
        backgroundColor: "#FFFFFF",
        borderRadius: Utils.px2dp(2),
        elevation: Utils.px2dp(8)
    },
    btnClear: {
        flexDirection: "row",
        alignItems: "center",
        height: Utils.px2dp(46)
    },
    btnClearIcon: {
        marginLeft: Utils.px2dp(16),
        width: Utils.px2dp(15),
        height: Utils.px2dp(16)
    },
    btnClearText: {
        marginLeft: Utils.px2dp(10),
        fontSize: Utils.px2dp(16),
        color: "#303235"
    },
    menuList: {
        marginTop: Utils.px2dp(2),
        width: Utils.px2dp(370),
        flex: 1
    },
    menuItem: {
        width: Utils.px2dp(370),
        height: Utils.px2dp(80)
    },
    menuBottom: {
        flexDirection: "row",
        alignItems: "center",
        height: Utils.px2dp(44)
    },
    btnBalance: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: Utils.px2dp(10),
        width: Utils.px2dp(350),
        height: Utils.px2dp(58),
        backgroundColor: "#F85136",
        borderRadius: Utils.px2dp(2)
    },
    btnBalanceText: {
        fontSize: Utils.px2dp(18),
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    separator: {
        width: Utils.px2dp(2),
        height: Utils.getScreenHeight() - Utils.px2dp(129),
        backgroundColor: "#DDDDDD"
    },
    menuSide: {
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        height: Utils.getScreenHeight() - Utils.px2dp(99)
    },
    menuSideTop: {
        alignItems: "center"
    },
    btnSub: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: Utils.px2dp(20)
    },
    btnOpIcon: {
        width: Utils.px2dp(44),
        height: Utils.px2dp(44)
    },
    num: {
        fontSize: Utils.px2dp(28),
        fontWeight: "bold",
        color: "#303235",
        lineHeight: Utils.px2dp(74)
    },
    btnAdd: {
        alignItems: "center",
        justifyContent: "center"
    },
    btnDelete: {
        marginBottom: Utils.px2dp(10),
        alignItems: "center",
        justifyContent: "center",
        width: Utils.px2dp(99),
        height: Utils.px2dp(58)
    },
    btnDeleteText: {
        fontSize: Utils.px2dp(16),
        color: "#303235"
    },
    center: {
        marginLeft: Utils.px2dp(25),
    },
    centerHeader: {
        flexDirection: "row",
        alignItems: "center",
        height: Utils.px2dp(74)
    },
    foodTitle: {
        fontSize: Utils.px2dp(24),
        fontWeight: "bold",
        color: "#FFFFFF"
    },
});