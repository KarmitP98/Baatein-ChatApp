import { authReducer } from './auth/auth.reducer';
import { userReducer } from './user/user.reducer'
import { combineReducers } from '@ngrx/store';

export const rootReducer = combineReducers({ user: userReducer, auth: authReducer })