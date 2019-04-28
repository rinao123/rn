import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import Utils from "../common/Utils";
var loginImage = require("../resources/images/login.png");
var merchantIcon = require("../resources/images/merchant.png");
var userIcon = require("../resources/images/user.png");
var passwordIcon = require("../resources/images/password.png");
var checkboxIcon = require("../resources/images/checkbox.png");
var checkboxSelectedIcon = require("../resources/images/checkbox_selected.png");

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.merchantNo = "";
        this.account = "";
        this.password = "";
        this.state = { rememberPassword: false };
    }
    onMerchantNoInput = (merchantNo) => {
        this.merchantNo = merchantNo;
    }
    onAccountInput = (account) => {
        this.account = account;
    }
    onPasswordInput = (password) => {
        this.password = password;
    }
    onLoginClick = () => {
        this.props.navigation.navigate("Home");
    }
    onRememberPasswordClick = () => {
        this.setState({ rememberPassword: !this.state.rememberPassword });
    }
    onForgetPasswordClick = () => {
        Alert.alert("onForgetPasswordClick");
    }
    renderCheckboxRememberPassword = () => {
        let icon = this.state.rememberPassword ? checkboxSelectedIcon : checkboxIcon;
        return (
            <TouchableOpacity style={styles.checkboxRememberPassword} activeOpacity={0.8} onPress={this.onRememberPasswordClick}>
                <Image style={styles.checkboxRememberPasswordIcon} source={icon} />
                <Text style={styles.checkboxRememberPasswordText}>记住密码</Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={loginImage} />
                <View style={styles.login}>
                    <View style={styles.loginContainer}>
                        <View>
                            <View style={styles.tabsContainer}>
                                <View style={styles.tab}>
                                    <Text style={[styles.tabTitle, styles.selected]}>登录</Text>
                                </View>
                                <View style={styles.tab}>
                                    <Text style={styles.tabTitle}>注册</Text>
                                </View>
                            </View>
                            <View style={styles.tabLine} />
                        </View>
                        <View style={[styles.inputContainer, { marginTop: Utils.px2dp(30) }]}>
                            <Image style={styles.inputIcon} source={merchantIcon} />
                            <TextInput style={styles.input} placeholder="商户编号" placeholderTextColor="#A6ADB8" keyboardType="number-pad" onChangeText={this.onMerchantNoInput} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={userIcon} />
                            <TextInput style={styles.input} placeholder="账号" placeholderTextColor="#A6ADB8" onChangeText={this.onAccountInput} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={passwordIcon} />
                            <TextInput style={styles.input} placeholder="密码" placeholderTextColor="#A6ADB8" secureTextEntry={true} onChangeText={this.onPasswordInput} />
                        </View>
                        <TouchableOpacity style={styles.btnLogin} activeOpacity={0.8} onPress={this.onLoginClick}>
                            <Text style={styles.btnLoginText}>登录</Text>
                        </TouchableOpacity>
                        <View style={styles.loginBottom}>
                            {this.renderCheckboxRememberPassword()}
                            <TouchableOpacity style={styles.btnForgetPassword} activeOpacity={0.8} onPress={this.onForgetPasswordClick}>
                                <Text style={styles.btnForgetPasswordText}>找回密码</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    image: {
        width: Utils.px2dp(600),
        height: Utils.getScreenHeight()
    },
    login: {
        alignItems: "center",
        flex: 1,
        marginTop: Utils.px2dp(196)
    },
    loginContainer: {
        alignItems: "flex-start",
    },
    tabsContainer: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    tab: {
        alignItems: "center",
        justifyContent: "center"
    },
    tabTitle: {
        marginRight: Utils.px2dp(20),
        fontSize: Utils.px2dp(18),
        color: "#303235"
    },
    selected: {
        fontSize: Utils.px2dp(24),
        fontWeight: "bold"
    },
    tabLine: {
        marginTop: Utils.px2dp(5),
        marginLeft: Utils.px2dp(8),
        width: Utils.px2dp(32),
        height: Utils.px2dp(3),
        backgroundColor: "#2E7BFD"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Utils.px2dp(15),
        width: Utils.px2dp(302),
        height: Utils.px2dp(40),
        borderRadius: Utils.px2dp(2),
        borderWidth: Utils.px2dp(1),
        borderStyle: "solid",
        borderColor: "#DCDFE6"
    },
    inputIcon: {
        marginLeft: Utils.px2dp(8),
        width: Utils.px2dp(24),
        height: Utils.px2dp(24)
    },
    input: {
        marginLeft: Utils.px2dp(8),
        fontSize: Utils.px2dp(14),
        color: "#303235"
    },
    btnLogin: {
        alignItems: "center",
        justifyContent: "center",
        width: Utils.px2dp(302),
        height: Utils.px2dp(40),
        backgroundColor: "#2E7BFD",
        borderRadius: Utils.px2dp(2)
    },
    btnLoginText: {
        fontSize: Utils.px2dp(14),
        color: "#FFFFFF"
    },
    loginBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: Utils.px2dp(302)
    },
    checkboxRememberPassword: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: Utils.px2dp(15),
        paddingBottom: Utils.px2dp(15)
    },
    checkboxRememberPasswordIcon: {
        width: Utils.px2dp(14),
        height: Utils.px2dp(14)
    },
    checkboxRememberPasswordText: {
        marginLeft: Utils.px2dp(5),
        fontSize: Utils.px2dp(14),
        color: "#A6ADB8"
    },
    btnForgetPassword: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Utils.px2dp(15),
        paddingBottom: Utils.px2dp(15)
    },
    btnForgetPasswordText: {
        fontSize: Utils.px2dp(14),
        color: "#A6ADB8"
    },
});