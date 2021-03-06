import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import Utils from "../common/Utils";
var workspaceIcon = require("../resources/images/workspace.png");
var printerIcon = require("../resources/images/printer.png");
var menuIcon = require("../resources/images/menu.png");
var helpIcon = require("../resources/images/help.png");
var orderIcon = require("../resources/images/order.png");
var settingIcon = require("../resources/images/setting.png");
var callNumberIcon = require("../resources/images/call_number.png");
var soldOutIcon = require("../resources/images/sold_out.png");
var reportIcon = require("../resources/images/report.png");
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as menuAction from "../redux/actions/menuAction";

export default class Home extends Component {
    static navigationOptions = {
        header: null,
        transitionConfig: null
    };
    constructor(props) {
        super(props);
        this.menuList = [
            { icon: workspaceIcon, title: "工作台", page: "Menu" },
            { icon: printerIcon, title: "打印", page: "Printer" },
            { icon: menuIcon, title: "点餐", page: "Menu" },
            { icon: helpIcon, title: "帮助", page: "Menu" },
            { icon: orderIcon, title: "订单", page: "Menu" },
            { icon: settingIcon, title: "设置", page: "Menu" },
            { icon: callNumberIcon, title: "叫号", page: "Menu" },
            { icon: soldOutIcon, title: "沽清", page: "SoldOut" },
            { icon: reportIcon, title: "报表", page: "Menu" }
        ]
    }
    onMenuItemClick = (page) => {
        this.props.navigation.push(page);
    }
    renderMenuList = () => {
        return (
            <View style={styles.menuListContainer}>
                {this.renderMenuItems()}
            </View>
        );
    }
    renderMenuItems = () => {
        let menuList = [];
        for (let index in this.menuList) {
            let menu = this.menuList[index];
            menuList.push(
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.8} onPress={() => { this.onMenuItemClick(menu.page) } } key={index}>
                    <Image style={styles.menuItemIcon} source={menu.icon} />
                    <Text style={styles.menuItemTitle}>{menu.title}</Text>
                </TouchableOpacity>
            );
        }
        return menuList;
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.menuList} horizontal={true}>
                    {this.renderMenuList()}
                </ScrollView>
                <Text style={styles.userName}>582991/小翁</Text>
                <Text style={styles.account}>13265399506</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: "#34363A"
    },
    menuList: {
        width: Utils.getScreenWidth(),
        height: Utils.getScreenHeight()
    },
    menuListContainer: {
        flexWrap: "wrap",
        marginTop: Utils.getScreenHeight() - Utils.px2dp(460),
        marginLeft: Utils.px2dp(60),
        marginRight: Utils.px2dp(40),
        height: Utils.px2dp(400)
    },
    menuItem: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: Utils.px2dp(20),
        marginRight: Utils.px2dp(20),
        width: Utils.px2dp(220),
        height: Utils.px2dp(170),
        backgroundColor: "#FFFFFF",
        elevation: Utils.px2dp(8)
    },
    menuItemIcon: {
        width: Utils.px2dp(88),
        height: Utils.px2dp(88)
    },
    menuItemTitle: {
        marginTop: Utils.px2dp(10),
        fontSize: Utils.px2dp(18),
        fontWeight: "bold",
        color: "#303235"
    },
    userName: {
        position: "absolute",
        top: Utils.px2dp(100),
        left: Utils.px2dp(60),
        fontSize: Utils.px2dp(24),
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    account: {
        position: "absolute",
        top: Utils.px2dp(134),
        left: Utils.px2dp(60),
        fontSize: Utils.px2dp(18),
        color: "#FFFFFF"
    }
});