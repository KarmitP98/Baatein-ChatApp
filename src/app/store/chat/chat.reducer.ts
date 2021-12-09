import { UserModel } from "../../models/UserModel";
import { ChatActions, END_CHAT, SET_ALL_CHATS, SET_CURRENT_CHAT, SET_TYPING, START_CHAT } from "./chat.actions";
import ChatModel from "../../models/ChatModel";

export interface ChatState {
    with : UserModel;
    typing : boolean;
    currentChat : ChatModel;
    allChats : ChatModel[];
}

export const initialState : ChatState = {
    with : undefined,
    typing : undefined,
    currentChat : undefined,
    allChats : []
};

export const chatReducer = ( state : ChatState = initialState, { type, payload } : ChatActions ) => {
    switch ( type ) {
        case START_CHAT:
            return { ...state, with : payload.with };
        case END_CHAT:
            return { ...state, with : undefined };
        case SET_TYPING:
            return { ...state, typing : payload };
        case SET_ALL_CHATS:
            return { ...state, allChats : payload };
        case SET_CURRENT_CHAT:
            return { ...state, currentChat : payload };
        default:
            return { ...state };
    }
};
