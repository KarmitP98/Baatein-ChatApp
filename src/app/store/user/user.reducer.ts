import { REMOVE_USER, SET_USER, userActions } from "./user.actions";
import { UserModel } from "../../models/UserModel";

export interface UserState {
    user : UserModel;
}

export const defaultState : UserState = {
    user : undefined
};

export const userReducer = ( state = defaultState, { type, payload } : userActions ) => {
    switch ( type ) {
        case SET_USER:
            return { ...state, user : payload };
        case REMOVE_USER:
            return { ...state, user : undefined };
        default:
            return { ...state };
    }
};
