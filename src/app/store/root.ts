import { authReducer, AuthState } from "./auth/auth.reducer";
import { userReducer, UserState } from "./user/user.reducer";
import { ActionReducerMap } from "@ngrx/store";
import { chatReducer, ChatState } from "./chat/chat.reducer";

export interface RootState {
    auth : AuthState,
    user : UserState,
    chat : ChatState
}

export const rootReducer : ActionReducerMap<RootState> = { user : userReducer, auth : authReducer, chat : chatReducer };
