import * as fromUI from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducers';
import * as fromIE from './ingreso-egreso/ingreso-egreso.reducers';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui  : fromUI.State;
    auth: fromAuth.AuthState;
    ingresoEgreso: fromIE.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui  : fromUI.uiReducer,
    auth: fromAuth.authReducer,
    ingresoEgreso: fromIE.ingresoEgresoReducer
};