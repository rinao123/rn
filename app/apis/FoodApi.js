
async function getFoodList() {
    try {
        let response = await fetch("https://web.qianteng2018.com/food_list.json");
        let responseJson = await response.json();
        if (responseJson.ret == 0) {
            return responseJson.navigation_foods;
        }
    } catch (error) {
        console.error(error);
    }
}

export default {
    getFoodList: getFoodList
}