import { Action } from "@ngrx/store";
import { UserModel } from "../../models/UserModel";

export const START_CHAT = "START_CHAT";
export const END_CHAT = "END_CHAT";

export class StartChatAction implements Action {
    readonly type : string = START_CHAT;
    
    constructor( public payload? : { with : UserModel } ) {}
}

export class EndChatAction implements Action {
    readonly type : string = START_CHAT;
    
    constructor( public payload? : any ) {}
}

export type ChatActions = StartChatAction | EndChatAction;
