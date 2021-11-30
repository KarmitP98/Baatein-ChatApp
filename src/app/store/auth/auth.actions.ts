import { FirebaseApp } from '@angular/fire/app';
import { Action } from '@ngrx/store';
import firebase from 'firebase/compat';
export const SET_AUTH = 'SET_AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH'

export class SetAuthAction implements Action {
    readonly type: string = SET_AUTH
    constructor(public payload: any) { }
}

export class RemoveAuthAction implements Action {
    readonly type: string = REMOVE_AUTH
    constructor(public payload: any) { }
}

export type AuthActions = SetAuthAction | RemoveAuthAction;
