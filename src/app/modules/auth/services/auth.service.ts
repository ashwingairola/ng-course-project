import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';

import { AppState } from '@models';
import { AuthModule } from '../auth.module';
import * as AuthActions from '../store/actions/auth.actions';
import {
	selectAuthError,
	selectAuthStatus,
	selectUser
} from '../store/selectors/auth.selectors';

@Injectable({
	providedIn: AuthModule
})
export class AuthService {
	serviceId: number;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private store: Store<AppState>
	) {
		this.serviceId = Math.random();

		const accessToken = this.getCookie('ACCESS_TOKEN') || '';
		const refreshToken = this.getCookie('REFRESH_TOKEN') || '';
		const email = this.getCookie('EMAIL') || '';

		if (accessToken) {
			this.store.dispatch(
				AuthActions.authSuccess({
					payload: { accessToken, refreshToken, email }
				})
			);
		}
	}

	user$ = this.store.select(selectUser);
	authStatus$ = this.store.select(selectAuthStatus);
	authError$ = this.store.select(selectAuthError);

	signUp(email: string, password: string) {
		this.store.dispatch(
			AuthActions.authStart({ payload: { email, password, mode: 'signup' } })
		);
	}

	login(email: string, password: string) {
		this.store.dispatch(
			AuthActions.authStart({ payload: { email, password, mode: 'login' } })
		);
	}

	logout() {
		this.store.dispatch(AuthActions.logout());
	}

	private getCookie(cookieName: string): string | undefined {
		const cookieValue = this.document.cookie
			.split('; ')
			.find(row => row.startsWith(cookieName))
			?.split('=')[1];

		return cookieValue;
	}
}
