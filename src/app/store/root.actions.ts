import { Action } from "@ngrx/store";

export const RESET_STORE = "RESET_STORE";

export class ResetStoreAction implements Action {
    readonly type : string = RESET_STORE;
}

export type rootStateActions = ResetStoreAction
