import { UserModel } from "./../../models/UserModel";
import { Action } from "@ngrx/store";

export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

export class setUserAction implements Action {
    readonly type : string = SET_USER;
    
    constructor( public payload : UserModel | undefined ) { }
}

export class RemoveUserAction implements Action {
    readonly type : string = REMOVE_USER;
    
    constructor( public payload? : UserModel | undefined ) { }
}

export type userActions = setUserAction | RemoveUserAction;
