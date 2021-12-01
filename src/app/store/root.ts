import { authReducer, AuthState } from "./auth/auth.reducer";
import { userReducer, UserState } from "./user/user.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface RootState {
    auth : AuthState,
    user : UserState
}

export const rootReducer : ActionReducerMap<RootState> = { user : userReducer, auth : authReducer };
