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
        default:
            return state;
    }
}