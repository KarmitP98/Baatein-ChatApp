import { AuthActions, SET_AUTH, REMOVE_AUTH } from './auth.actions';

const initialState = {
    auth: null
}

export const authReducer = ( state = initialState, { payload, type } : AuthActions) => {
    switch (type) {
        case SET_AUTH:
            return { ...state, auth: payload }
        case REMOVE_AUTH:
            return { ...state, auth: null }
        default:
            return { ...state }
    }
}
