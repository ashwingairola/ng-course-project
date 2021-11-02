import { createReducer, on } from '@ngrx/store';

import { AuthState } from '@models';
import * as AuthActions from '../actions/auth.actions';

const initialState: AuthState = {
	accessToken: '',
	refreshToken: '',
	email: '',
	authStatus: 'idle',
	authError: null
};

export const authReducer = createReducer(
	initialState,
	on(AuthActions.authStart, state => {
		return { ...state, authStatus: 'pending', authError: null };
	}),
	on(AuthActions.authFailed, (state, action) => {
		return { ...state, authStatus: 'rejected', authError: action.error };
	}),
	on(AuthActions.authSuccess, (state, action) => {
		const auth = action.payload;
		return {
			...state,
			...auth,
			authStatus: 'fulfilled',
			authError: null
		};
	}),
	on(AuthActions.logout, state => {
		return {
			...state,
			accessToken: '',
			email: '',
			refreshToken: '',
			authStatus: 'idle',
			authError: null
		};
	})
);
