import * as types from "./type"
export const deleteProduct = (id) => {
    return {
        type: types.DELETE_PRODUCT, id
    }
}

export const addProductOrderFirebase = (order) => {
    return {
        type: types.ADD_PRODUCT_ORDER_FIREBASE, order
    }
}