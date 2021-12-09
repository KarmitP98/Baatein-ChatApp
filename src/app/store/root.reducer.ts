import { RootState } from "./root";
import { initialState as AuthInitialState } from "./auth/auth.reducer";
import { defaultState as UserInitialState } from "./user/user.reducer";
import { initialState as ChatInitialState } from "./chat/chat.reducer";
import { RESET_STORE, rootStateActions } from "./root.actions";

export const initialState : RootState = {
    user : UserInitialState,
    chat : ChatInitialState,
    auth : AuthInitialState
};

export const rootReducer = ( state : RootState = initialState, action : rootStateActions ) => {
    switch ( action.type ) {
        case RESET_STORE:
            return { ...initialState };
        default:
            return { ...state };
    }
};
