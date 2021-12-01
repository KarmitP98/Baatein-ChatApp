import { UserModel } from "../../models/UserModel";
import { ChatActions, END_CHAT, START_CHAT } from "./chat.actions";

export interface ChatState {
    with : UserModel;
}

const initialState : ChatState = {
    with : undefined
};

export const chatReducer = ( state : ChatState = initialState, { type, payload } : ChatActions ) => {
    switch ( type ) {
        case START_CHAT:
            return {
                ...state, with : payload.with
            };
        case END_CHAT:
            return {
                ...state, with : undefined
            };
        default:
            return { ...state };
    }
};
