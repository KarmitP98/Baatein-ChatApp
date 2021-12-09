import { AuthActions, REMOVE_AUTH, SET_AUTH } from "./auth.actions";
import firebase from "firebase/compat";
import User = firebase.User;


export interface AuthState {
    auth : User;
}

export const initialState : AuthState = {
    auth : null
};

export const authReducer = ( state : AuthState = initialState, { payload, type } : AuthActions ) => {
    switch ( type ) {
        case SET_AUTH:
            return { ...state, auth : payload };
        case REMOVE_AUTH:
            return { ...state, auth : null };
        default:
            return { ...state };
    }
};
