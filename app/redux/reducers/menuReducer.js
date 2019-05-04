import { ADD } from "../actions/menuAction";

const initialState = {
    count: 0
};

function menuReducer(state = initialState, action) {
    switch (action.type) {
        case ADD:
            return Object.assign({}, state, { count: state.count + 1 });
        default:
            return state;
    }
}

export default menuReducer;
