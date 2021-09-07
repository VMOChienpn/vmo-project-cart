import * as types from "../action/types"
import firebase from 'firebase'

const initialStateAdmin = {
}

const adminReducer = (state = initialStateAdmin, action) => {
    switch (action.type) {

        case types.ADD_USER:
            firebase.database().ref('users').push(action.user)
            return state;
        case types.DELETE_USER:
            firebase.database().ref('users').child(action.id).remove();
            return state;
        case types.EDIT_USER:
            firebase.database().ref('users').child(action.id).update(action.user)
            return state;

        case types.ADD_PRODUCT_ADMIN:
            firebase.database().ref('products/' + action.category).push(action.product)
            console.log(action.product)
            return state;
        case types.EDIT_PRODUCT_ADMIN:
            firebase.database().ref('products/' + action.category).child(action.idEdit).update(action.infoEdit)
            return state;
        case types.DELETE_PRODUCT_ADMIN:
            firebase.database().ref('products/' + action.category).child(action.idDelete).remove()
            return state;

        case types.DELETE_PRODUCT_ORDER:
            firebase.database().ref('products/order').child(action.id).remove()
            return state;

        default:
            return state;
    }

}
export default adminReducer;
