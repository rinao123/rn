import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal, Animated, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FoodApi from "../apis/FoodApi";
import Utils from "../common/Utils";
var menuIcon = require("../resources/images/menu.png");
var deleteIcon = require("../resources/images/delete.png");
var subIcon = require("../resources/images/sub.png");
var addIcon = require("../resources/images/add.png");
var checkboxIcon = require("../resources/images/checkbox.png");
var checkboxSelectedIcon = require("../resources/images/checkbox_selected.png");

export default class OrderFood extends Component {
    static navigationOptions = {
        header: null,
        transitionConfig: null
    };
    constructor(props) {
        super(props);
        this.state = {
            navigationList: [],
            navigationId: 0,
            foodList: [],
            isShowSelectSpec: false,
            fadeInAnim: new Animated.Value(0),
            menuList: [
                { id: 1, food_name: "海盐脆脆芒芒海盐脆脆芒芒海盐脆脆芒芒", sku_name: "2磅 / 双倍芒果 /备注：字数太多那就2磅 / 双倍芒果 /备注：字数太多那就", num: 1, price: 109 },
                { id: 2, food_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { id: 3, food_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { id: 4, food_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { id: 5, food_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { id: 6, food_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { id: 7, food_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { id: 8, food_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 },
                { id: 9, food_name: "海盐脆脆芒芒", sku_name: "", num: 1, price: 109 }
            ],
            menuId: 0,
            num: 0,
            isTakeOut: false
        };
    }
    componentDidMount() {
        this.selectFirstMenuItem();
        this.requestData();
    }
    requestData = () => {
        this.getFoodList();
    }
    async getFoodList() {
        let navigationList = await FoodApi.getFoodList();
        this.setState({ navigationList }, () => {
            this.selectFirstNavigation();
        });
    }
    selectFirstMenuItem = () => {
        let menuId = 0;
        if (this.state.menuList.length > 0) {
            menuId = this.state.menuList[0].id;
        }
        this.selectMenuItem(menuId);
    }
    selectMenuItem = (menuId) => {
        let num = 0;
        for (let menu of this.state.menuList) {
            if (menu.id == menuId) {
                num = menu.num;
                break;
            }
        }
        this.setState({ menuId, num });
    }
    selectFirstNavigation = () => {
        let navigationId = 0;
        if (this.state.navigationList.length > 0) {
            navigationId = this.state.navigationList[0].nav_id;
        }
        this.selectNavigation(navigationId);
    }
    selectNavigation = (navigationId) => {
        let foodList = [];
        for (let navigation of this.state.navigationList) {
            if (navigation.nav_id == navigationId) {
                foodList = navigation.food_list;
                break;
            }
        }
        this.setState({ navigationId, foodList });
    }
    onBackClick = () => {
        this.props.navigation.pop();
    }
    onClearClick = () => {
        this.setState({ menuList: [], menuId: 0, num: 0 });
    }
    onMenuItemClick = (menuId) => {
        this.selectMenuItem(menuId);
    }
    onSubClick = () => {
        let num = this.state.num;
        num--;
        num = Math.max(num, 0);
        let menuList = this.state.menuList;
        for (let i in menuList) {
            let menu = menuList[i];
            if (menu.id != this.state.menuId) {
                continue;
            }
            if (num == 0) {
                menuList.splice(i, 1);
                this.setState({ menuList });
                this.selectFirstMenuItem();
            } else {
                menu.num = num;
                this.setState({ num, menuList });
                break;
            }
        }
    }
    onAddClick = () => {
        let num = this.state.num;
        num++;
        let menuList = this.state.menuList;
        for (let menu of menuList) {
            if (menu.id == this.state.menuId) {
                menu.num = num;
                this.setState({ num, menuList });
                return;
            }
        }
    }
    onDeleteClick = () => {
        let menuList = this.state.menuList;
        for (let i in menuList) {
            let menu = menuList[i];
            if (menu.id == this.state.menuId) {
                menuList.splice(i, 1);
                break;
            }
        }
        this.setState({ menuList });
        this.selectFirstMenuItem();
    }
    onTakeOutClick = () => {
        this.setState({ isTakeOut: !this.state.isTakeOut });
    }
    onBalanceClick = () => {

    }
    onFoodClick = (foodId) => {
        this.showSelectSpec();
    }
    onNavigationClick = (navigationId) => {
        this.selectNavigation(navigationId);
    }
    showSelectSpec = () => {
        this.setState({ isShowSelectSpec: true }, () => {
            Animated.timing(this.state.fadeInAnim, { toValue: 1, duration: 500 }).start();
        });
    }
    closeSelectSpec = () => {
        Animated.timing(this.state.fadeInAnim, { toValue: 0, duration: 500 }).start(() => {
            this.setState({ isShowSelectSpec: false });
        });
    }
    calculateMenuNum = () => {
        let num = 0;
        for (let menu of this.state.menuList) {
            num += menu.num;
        }
        return num;
    }
    calculateMenuTotalPrice = () => {
        let price = 0;
        for (let menu of this.state.menuList) {
            price += menu.price * menu.num;
        }
        return price;
    }
    formatFoodPrice = (food) => {
        let minPrice = food.sku_list[0].promote_price;
        let maxPrice = food.sku_list[0].promote_price;
        for (let sku of food.sku_list) {
            if (sku.promote_price < minPrice) {
                minPrice = sku.promote_price;
            }
            if (sku.promote_price > maxPrice) {
                maxPrice = sku.promote_price;
            }
        }
        if (minPrice == maxPrice) {
            return `¥${minPrice}`;
        } else {
            return `¥${minPrice}～¥${maxPrice}`;
        }
    }
    getMenuItemExtractor = (item, index) => {
        return index.toString();
    }
    getFoodExtractor = (item, index) => {
        return index.toString();
    }
    getNavigationExtractor = (item, index) => {
        return index.toString();
    }
    renderMenuItem = ({item}) => {
        let menuItemStyle = [styles.menuItem];
        let menuItemFoodNameStyle = [styles.menuItemFoodName];
        let menuItemNumStyle = [styles.menuItemNum];
        let menuItemPriceStyle = [styles.menuItemPrice];
        if (item.id == this.state.menuId) {
            menuItemStyle.push(styles.menuItemselected);
            menuItemFoodNameStyle.push(styles.menuItemTextSelected);
            menuItemNumStyle.push(styles.menuItemTextSelected);
            menuItemPriceStyle.push(styles.menuItemTextSelected);
        }
        return (
            <TouchableOpacity style={menuItemStyle} activeOpacity={0.8} onPress={() => this.onMenuItemClick(item.id)}>
                <View style={styles.menuItemLeft}>
                    <Text style={menuItemFoodNameStyle} numberOfLines={1}>{item.food_name}</Text>
                    {item.sku_name ? <Text style={styles.menuItemSkuName} numberOfLines={1}>{item.sku_name}</Text> : null}
                </View>
                <Text style={menuItemNumStyle}>{item.num}</Text>
                <Text style={menuItemPriceStyle}>¥{item.price}</Text>
            </TouchableOpacity>
        );
    }
    renderCheckboxTakeOut = () => {
        let icon = this.state.isTakeOut ? checkboxSelectedIcon : checkboxIcon;
        return (
            <TouchableOpacity style={styles.checkboxTakeOut} activeOpacity={0.8} onPress={this.onTakeOutClick}>
                <Image style={styles.checkboxTakeOutIcon} source={icon} />
                <Text style={styles.checkboxTakeOutText}>外带</Text>
            </TouchableOpacity>
        );
    }
    renderMenuSide = () => {
        if (this.state.menuId) {
            return (
                <View style={styles.menuSide}>
                    <View style={styles.menuSideTop}>
                        <TouchableOpacity style={styles.btnSub} activeOpacity={0.8} onPress={this.onSubClick}>
                            <Image style={styles.btnOpIcon} source={subIcon} />
                        </TouchableOpacity>
                        <Text style={styles.num}>{this.state.num}</Text>
                        <TouchableOpacity style={styles.btnAdd} activeOpacity={0.8} onPress={this.onAddClick}>
                            <Image style={styles.btnOpIcon} source={addIcon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnDelete} activeOpacity={0.8} onPress={this.onDeleteClick}>
                        <Text style={styles.btnDeleteText}>删除</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return null;
        }
    }
    renderFoodWarning = (food) => {
        if (food.state != 1) {
            return (
                <Text style={styles.foodWarning}>已下架</Text>
            );
        }
        let stock = 0;
        for (let sku of food.sku_list) {
            if (sku.infinite_stock) {
                return null;
            }
            stock += sku.stock;
        }
        if (stock == 0) {
            return (<Text style={styles.foodWarning}>已售罄</Text>);
        } else if (stock <= 3) {
            return (<Text style={styles.foodWarning}>仅剩{stock}份</Text>);
        } else {
            return null;
        }
    }
    renderFood = ({item, index}) => {
        let foodStyle = [styles.food];
        if (index % 5 == 4) {
            foodStyle.push(styles.foodRight);
        }
        return (
            <TouchableOpacity style={foodStyle} activeOpacity={0.8} onPress={() => this.onFoodClick(item.food_id)}>
                <Text style={styles.foodName} numberOfLines={2}>{item.food_name}</Text>
                <Text style={styles.foodPrice}>{this.formatFoodPrice(item)}</Text>
                {this.renderFoodWarning(item)}
            </TouchableOpacity>
        );
    }
    renderNavigation = ({item, index}) => {
        let navigationStyle = [styles.navigation];
        let navigationNameStyle = [styles.navigationName];
        if (item.nav_id == this.state.navigationId) {
            navigationStyle.push(styles.navigationSelected);
            navigationNameStyle.push(styles.navigationNameSelected);
        }
        return (
            <TouchableOpacity style={navigationStyle} activeOpacity={0.8} onPress={() => this.onNavigationClick(item.nav_id)}>
                <Text style={navigationNameStyle}>{item.nav_name}</Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <LinearGradient style={styles.container} colors={["#3F8ED3", "#0443AF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <View>
                    <TouchableOpacity style={styles.btnBack} activeOpacity={0.8} onPress={this.onBackClick}>
                        <Image style={styles.btnBackIcon} source={menuIcon} />
                        <Text style={styles.btnBackText}>点餐</Text>
                    </TouchableOpacity>
                    <View style={styles.menuView}>
                        <View>
                            <TouchableOpacity style={styles.btnClear} activeOpacity={0.8} onPress={this.onClearClick}>
                                <Image style={styles.btnClearIcon} source={deleteIcon} />
                                <Text style={styles.btnClearText}>清空</Text>
                            </TouchableOpacity>
                            <FlatList style={styles.menuList} data={this.state.menuList} extraData={{ menuId: this.state.menuId, length: this.state.menuList.length }} keyExtractor={this.getMenuItemExtractor} renderItem={this.renderMenuItem} />
                            <View style={styles.menuBottom}>
                                {this.renderCheckboxTakeOut()}
                                <Text style={styles.total}>共 {this.calculateMenuNum()} 项 ¥{Utils.formatPriceWithoutLastZero(this.calculateMenuTotalPrice())}</Text>
                            </View>
                            <TouchableOpacity style={styles.btnBalance} activeOpacity={0.8} onPress={this.onBalanceClick}>
                                <Text style={styles.btnBalanceText}>结账</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separator} />
                        {this.renderMenuSide()}
                    </View>
                </View>
                <View style={styles.center}>
                    <View style={styles.centerHeader}>
                        <Text style={styles.foodTitle}>菜单</Text>
                    </View>
                    <FlatList style={styles.foodList} data={this.state.foodList} extraData={{ length: this.state.foodList.length }} numColumns={5} keyExtractor={this.getMenuItemExtractor} renderItem={this.renderFood} />
                </View>
                <View style={styles.navigationView}>
                    <FlatList style={styles.navigationList} data={this.state.navigationList} extraData={{ length: this.state.navigationList.length }} keyExtractor={this.getNavigationExtractor} renderItem={this.renderNavigation} />
                </View>
                <Modal visible={this.state.isShowSelectSpec} transparent={true}>
                    <TouchableOpacity style={styles.mask} activeOpacity={0.8} onPress={this.closeSelectSpec} />
                    <Animated.View  style={[styles.selectSpecModal, {opacity: this.state.fadeInAnim}]}>
                    </Animated.View>
                </Modal>
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
        marginLeft: Utils.px2dp(15),
        width: Utils.px2dp(16),
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
        flexDirection: "row",
        alignItems: "center",
        width: Utils.px2dp(370),
        height: Utils.px2dp(80)
    },
    menuItemselected: {
        backgroundColor: "rgba(153, 153, 153, 0.2)"
    },
    menuItemLeft: {
        marginLeft: Utils.px2dp(15),
    },
    menuItemFoodName: {
        width: Utils.px2dp(218),
        fontSize: Utils.px2dp(18),
        fontWeight: "bold",
        color: "#303235"
    },
    menuItemSkuName: {
        width: Utils.px2dp(218),
        fontSize: Utils.px2dp(12),
        color: "#A6ADB8"
    },
    menuItemNum: {
        marginLeft: Utils.px2dp(23),
        width: Utils.px2dp(20),
        fontSize: Utils.px2dp(18),
        fontWeight: "bold",
        color: "#303235"
    },
    menuItemPrice: {
        marginLeft: Utils.px2dp(19),
        width: Utils.px2dp(60),
        fontSize: Utils.px2dp(18),
        fontWeight: "bold",
        color: "#303235",
        textAlign: "right"
    },
    menuItemTextSelected: {
        color: "#F24724"
    },
    menuBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: Utils.px2dp(44)
    },
    checkboxTakeOut: {
        flexDirection: "row",
        alignItems: "center",
        height: Utils.px2dp(44)
    },
    checkboxTakeOutIcon: {
        marginLeft: Utils.px2dp(10),
        width: Utils.px2dp(14),
        height: Utils.px2dp(14)
    },
    checkboxTakeOutText: {
        marginLeft: Utils.px2dp(5),
        marginRight: Utils.px2dp(10),
        fontSize: Utils.px2dp(14),
        color: "#303235"
    },
    total: {
        marginRight: Utils.px2dp(15),
        fontSize: Utils.px2dp(14),
        color: "#303235"
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
    foodList: {
        width: Utils.px2dp(690),
        height: Utils.getScreenHeight() - Utils.px2dp(99)
    },
    food: {
        position: "relative",
        marginRight: Utils.px2dp(10),
        marginBottom: Utils.px2dp(10),
        width: Utils.px2dp(130),
        height: Utils.px2dp(110),
        backgroundColor: "#FFFFFF",
        borderRadius: Utils.px2dp(2),
        elevation: Utils.px2dp(8)
    },
    foodRight: {
        marginRight: 0
    },
    foodName: {
        position: "absolute",
        top: Utils.px2dp(10),
        left: Utils.px2dp(10),
        width: Utils.px2dp(110),
        fontSize: Utils.px2dp(18),
        fontWeight: "bold",
        color: "#303235"
    },
    foodPrice: {
        position: "absolute",
        top: Utils.px2dp(71),
        left: Utils.px2dp(10),
        fontSize: Utils.px2dp(12),
        color: "#A6ADB8"
    },
    foodWarning: {
        position: "absolute",
        top: Utils.px2dp(88),
        left: Utils.px2dp(10),
        fontSize: Utils.px2dp(12),
        color: "#F24724"
    },
    navigationView: {
        marginLeft: Utils.px2dp(25)
    },
    navigationList: {
        marginTop: Utils.px2dp(74),
        height: Utils.getScreenHeight() - Utils.px2dp(99)
    },
    navigation: {
        marginBottom: Utils.px2dp(10),
        alignItems: "center",
        justifyContent: "center",
        width: Utils.px2dp(106),
        height: Utils.px2dp(46),
        borderRadius: Utils.px2dp(2)
    },
    navigationSelected: {
        borderWidth: Utils.px2dp(2),
        borderStyle: "solid",
        borderColor: "#FFFFFF"
    },
    navigationName: {
        fontSize: Utils.px2dp(16),
        color: "rgba(255, 255, 255, 0.8)"
    },
    navigationNameSelected: {
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    mask: {
        position: "absolute",
        top: 0,
        left: 0,
        width: Utils.getScreenWidth(),
        height: Utils.getScreenHeight()
    },
    selectSpecModal: {
        position: "absolute",
        top: Utils.px2dp(74),
        left: Utils.px2dp(520),
        width: Utils.px2dp(350),
        height: Utils.getScreenHeight() - Utils.px2dp(99),
        backgroundColor: "#FFFFFF"
    }
});