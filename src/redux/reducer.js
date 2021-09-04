import { combineReducers } from "redux";
import adminReducer from "./admin/admin-reducer";
import productsReducer from "./products/product-reducers";

const reducerProducts = combineReducers({
    allProducts: productsReducer,
    allAdmin: adminReducer
})

export default reducerProducts;