import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import { AuthApiService } from '../../services/auth-api.service';
import { EAuthError, IAuthResponse } from '../../models';

@Injectable()
export class AuthEffects {
	authLogin$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.authStart),
			switchMap(({ payload: auth }) => {
				const { email, mode, password } = auth;

				return of(null).pipe(
					switchMap(() => {
						return mode === 'login'
							? this.authApiService.login(email, password)
							: this.authApiService.signUp(email, password);
					}),
					tap(authResponse => {
						this.saveAuthResponse(authResponse);
					}),
					map(authResponse => {
						return AuthActions.authSuccess({
							payload: {
								accessToken: authResponse.idToken,
								email: authResponse.email,
								refreshToken: authResponse.refreshToken
							}
						});
					}),
					tap(() => {
						this.router.navigate(['/']);
					}),
					catchError(err => {
						return this.handleAuthError(err);
					})
				);
			})
		)
	);

	authLogout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.logout),
				tap(() => {
					this.document.cookie =
						'ACCESS_TOKEN=null; expires=Thu, 01 Jan 1970 00:00:01 GMT';
					this.document.cookie =
						'REFRESH_TOKEN=null; expires=Thu, 01 Jan 1970 00:00:01 GMT';
					this.document.cookie =
						'EMAIL=null; expires=Thu, 01 Jan 1970 00:00:01 GMT';
					this.router.navigate(['/authenticate']);
				})
			),
		{ dispatch: false }
	);

	constructor(
		private actions$: Actions,
		@Inject(DOCUMENT) private document: Document,
		private router: Router,
		private authApiService: AuthApiService
	) {}

	private saveAuthResponse(response: IAuthResponse) {
		const { email, idToken: accessToken, refreshToken, expiresIn } = response;
		this.document.cookie = `ACCESS_TOKEN=${accessToken}; max-age=${expiresIn}`;
		this.document.cookie = `REFRESH_TOKEN=${refreshToken}`;
		this.document.cookie = `EMAIL=${email}`;
	}

	private handleAuthError(error: Error) {
		if (error instanceof HttpErrorResponse) {
			const errorMessage = error.error.error?.message || EAuthError.DEFAULT;
			return of(AuthActions.authFailed({ error: errorMessage }));
		}

		return of(AuthActions.authFailed({ error: EAuthError.DEFAULT }));
	}
}
