import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import Utils from "../common/Utils";

export default class Index extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = { merchantNo: "", account: "", password: "", rememberPassword: false };
    }
    onMerchantNoInput(merchantNo) {
        this.setState({ merchantNo });
    }
    onAccountInput(account) {
        this.setState({ account });
    }
    onPasswordInput(password) {
        this.setState({ password });
    }
    onLoginClick() {
        Alert.alert("onLoginClick");
    }
    onRememberPasswordClick() {
        this.setState({ rememberPassword: true });
    }
    renderCheckboxRememberPassword() {
        let image = null;
        if (this.state.rememberPassword) {
            image = (<Image style={styles.checkboxRememberPasswordIcon} source={require("../resources/images/checkbox_selected.png")} />);
        } else {
            image = (<Image style={styles.checkboxRememberPasswordIcon} source={require("../resources/images/checkbox.png")} />);
        }
        return (
            <TouchableOpacity style={styles.checkboxRememberPassword} activeOpacity={0.5} onPress={this.onRememberPasswordClick}>
                {image}
                <Text style={styles.checkboxRememberPasswordText}>记住密码</Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require("../resources/images/login.png")} />
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
                            <Image style={styles.inputIcon} source={require("../resources/images/merchant.png")} />
                            <TextInput style={styles.input} placeholder="商户编号" placeholderTextColor="#A6ADB8" keyboardType="number-pad" onChangeText={this.onMerchantNoInput} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={require("../resources/images/user.png")} />
                            <TextInput style={styles.input} placeholder="账号" placeholderTextColor="#A6ADB8" onChangeText={this.onAccountInput} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={require("../resources/images/password.png")} />
                            <TextInput style={styles.input} placeholder="密码" placeholderTextColor="#A6ADB8" secureTextEntry={true} onChangeText={this.onPasswordInput} />
                        </View>
                        <TouchableOpacity style={styles.btnLogin} activeOpacity={0.5} onPress={this.onLoginClick}>
                            <Text style={styles.btnLoginText}>登录</Text>
                        </TouchableOpacity>
                        <View style={styles.loginBottom}>
                            {this.renderCheckboxRememberPassword()}
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
        marginTop: Utils.px2dp(15)
    },
    checkboxRememberPassword: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    checkboxRememberPasswordIcon: {
        width: Utils.px2dp(14),
        height: Utils.px2dp(14)
    },
    checkboxRememberPasswordText: {
        marginLeft: Utils.px2dp(5),
        fontSize: Utils.px2dp(14),
        color: "#A6ADB8"
    }
});