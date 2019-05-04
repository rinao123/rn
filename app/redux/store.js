import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import menuReducer from "./reducers/menuReducer";

const allReducers = combineReducers({ menuReducer });
let store = createStore(allReducers, applyMiddleware(thunkMiddleware));

export default store;