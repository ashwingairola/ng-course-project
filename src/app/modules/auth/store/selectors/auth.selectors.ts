import { AppState } from '@models';
import { createSelector } from '@ngrx/store';
import { IUser } from 'src/app/modules/auth/models';

export const selectAuth = (state: AppState) => state.auth;

export const selectUser = createSelector(
	selectAuth,
	(auth): IUser => auth as IUser
);

export const selectAuthStatus = createSelector(
	selectAuth,
	auth => auth.authStatus
);

export const selectAuthError = createSelector(
	selectAuth,
	auth => auth.authError
);
