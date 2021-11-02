import { createAction, props } from '@ngrx/store';

import { EAuthError } from '../../models';

export const authStart = createAction(
	'[Auth] AUTH_START',
	props<{
		payload: { email: string; password: string; mode: 'signup' | 'login' };
	}>()
);

export const authFailed = createAction(
	'[Auth] AUTH_FAILED',
	props<{ error: EAuthError }>()
);

export const authSuccess = createAction(
	'[Auth] AUTH_SUCCESS',
	props<{
		payload: { accessToken: string; refreshToken: string; email: string };
	}>()
);

export const logout = createAction('[Auth] LOGOUT');
