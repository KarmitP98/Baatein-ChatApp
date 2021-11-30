import { userActions, SET_USER, REMOVE_USER } from './user.actions';

const defaultState = {
    user: undefined
}

export const userReducer = (state = defaultState, { type, payload }: userActions) => {
    switch (type) {
        case SET_USER:
            return { ...state, user: payload }
        case REMOVE_USER:
            return { ...state, user: undefined }
        default:
            return { ...state }
    }
}