import { ADD, SUB, DEL, CLEAR } from "../actions/menuAction";

const initialState = {
    menuList: []
};

function menuReducer(state = initialState, action) {
    switch (action.type) {
        case ADD:
            return add(state, action.params);
        case SUB:
            return sub(state, action.params);
        case DEL:
            return del(state, action.params);
        case CLEAR:
            return clear(state);
        default:
            return state;
    }
}

function add(state, params) {
    // skuId, favorIds, goodsName, skuName, price
    return Object.assign({}, state, { count: state.count + 1 });
}

function sub(state, params) {

}

function del(state, params) {

}

function clear(state) {
    return Object.assign({}, state, { menuList: [] });
}

export default menuReducer;
