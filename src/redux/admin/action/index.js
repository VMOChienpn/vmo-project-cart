import * as types from "./types"

export const addUser = (user) => {
    return {
        type: types.ADD_USER, user
    }
}
export const deleteUser = (id) => {
    return {
        type: types.DELETE_USER, id
    }
}
export const editUser = (id, user) => {
    return {
        type: types.EDIT_USER, id, user
    }
}