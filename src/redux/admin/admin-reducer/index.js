import * as types from "../action/types"
import firebase from 'firebase'

const initialStateAdmin = {

}
firebase.database().ref('products/' + 'foods').child("-MipWoAU7b8XwTNdQfW5").remove();
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
        case types.DELETE_PRODUCT_ADMIN: {
            // firebase.database().ref(`products/ + ${action.category} + "/" + ${action.idDelete}`).remove()
            // console.log('products/' + action.category + "/" + action.idDelete)
            // const mPostReference = firebase.database().getInstance().getReference()
            //     .child(action.category).child(action.idDelete);
            // mPostReference.removeValue();
            // console.log("đây nữa" + action.category + action.idDelete)
            // firebase.database().ref('products/').child(action.category).child(action.idDelete).remove()
            //console.log(action.idDelete)
            // const a = async () => {
            //     let b = await (firebase.database().ref('products/' + action.category))
            //     b.child(action.idDelete)
            // }
            // a()


            return state;
        }

        default:
            return state;
    }

}
export default adminReducer;
