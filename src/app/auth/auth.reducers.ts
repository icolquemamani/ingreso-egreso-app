import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    autenticado: boolean;
    user: User
}

const initState: AuthState = {
    autenticado: false,
    user: null
}

export function authReducer( state = initState, action: fromAuth.actions ) : AuthState {
    switch ( action.type ) {
        case fromAuth.SET_USER:
            return { ...state, user: { ...action.user } };
        case fromAuth.UNSET_USER:
            return { autenticado: false, user: null };
        default:
            return state;
    }
}