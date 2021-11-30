import { AuthActions, SET_AUTH, REMOVE_AUTH } from './auth.actions';
const defaultState = {
    auth: null
}

export const authReducer = (state = defaultState, { type, payload }: AuthActions) => {
    switch (type) {
        case SET_AUTH:
            return { ...state, auth: payload }
        case REMOVE_AUTH:
            return { ...state, auth: null }
        default:
            return { ...state }
    }
}