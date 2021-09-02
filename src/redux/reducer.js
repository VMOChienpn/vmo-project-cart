import { combineReducers } from "redux";
import productsReducer from "./products/product-reducers";

const reducerProducts = combineReducers({
    allProducts: productsReducer,
})

export default reducerProducts;