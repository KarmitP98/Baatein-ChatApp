import { Action } from "@ngrx/store";
import { UserModel } from "../../models/UserModel";
import ChatModel from "../../models/ChatModel";

export const START_CHAT = "START_CHAT";
export const END_CHAT = "END_CHAT";
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
export const GET_CURRENT_CHAT = "GET_CURRENT_CHAT";
export const SET_ALL_CHATS = "SET_ALL_CHATS";
export const GET_ALL_CHATS = "GET_ALL_CHATS";
export const SET_TYPING = "SET_TYPING";
export const GET_CHAT = "GET_CHAT";

export class StartChatAction implements Action {
    readonly type : string = START_CHAT;
    
    constructor( public payload? : { with : UserModel } ) {}
}

export class EndChatAction implements Action {
    readonly type : string = START_CHAT;
    
    constructor( public payload? : any ) {}
}

export class SetAllChatsAction implements Action {
    readonly type : string = SET_ALL_CHATS;
    
    constructor( public payload? : ChatModel[] ) {}
}

export class SetCurrentChatAction implements Action {
    readonly type : string = SET_CURRENT_CHAT;
    
    constructor( public payload? : ChatModel ) {}
}

export class SetTypingAction implements Action {
    readonly type : string = SET_TYPING;
    
    constructor( public payload? : UserModel ) {}
}

export class GetChatAction implements Action {
    readonly type : string = GET_CHAT;
    
    constructor( public payload : { with? : string, cId? : string } ) {}
}

export type ChatActions =
    StartChatAction
    | EndChatAction
    | SetTypingAction
    | SetAllChatsAction
    | SetCurrentChatAction
    | GetChatAction
