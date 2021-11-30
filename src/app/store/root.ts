import { userReducer } from './user/user.reducer'
import { combineReducers } from '@ngrx/store';

export const rootReducer = combineReducers({ userReducer: userReducer })