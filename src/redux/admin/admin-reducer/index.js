import * as types from "../action/types"
//import { getUsers } from '../../../services/api'
import firebase from 'firebase'

const initialStateAdmin = {
    //dataUser: getUsers,

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
        default:
            return state;
    }

}
export default adminReducer;
