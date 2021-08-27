import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment as env } from '@env';
import { EAuthError, IAuthResponse, IUser } from 'src/app/shared/auth/models';
import { AuthModule } from '../auth.module';

@Injectable({
	providedIn: AuthModule
})
export class AuthService {
	constructor(
		@Inject(DOCUMENT) private document: Document,
		private http: HttpClient,
		private router: Router
	) {}

	private readonly _accessToken = this.getCookie('ACCESS_TOKEN');
	private readonly _refreshToken = this.getCookie('REFRESH_TOKEN');
	private readonly _email = this.getCookie('EMAIL');

	private _user$ = new BehaviorSubject<IUser>({
		accessToken: this._accessToken || '',
		refreshToken: this._refreshToken || '',
		email: this._email || ''
	});

	user$ = this._user$.asObservable();

	signUp(email: string, password: string) {
		return this.http
			.post<IAuthResponse>(
				'auth/signUp',
				{ email, password, returnSecureToken: true },
				{ params: { key: env.firebaseApiKey } }
			)
			.pipe(
				tap(response => {
					this.saveAuthResponse(response);
				}),
				catchError(e => this.handleAuthError(e))
			);
	}

	login(email: string, password: string) {
		return this.http
			.post<IAuthResponse>(
				'auth/login',
				{ email, password, returnSecureToken: true },
				{ params: { key: env.firebaseApiKey } }
			)
			.pipe(
				tap(response => {
					this.saveAuthResponse(response);
				}),
				catchError(e => this.handleAuthError(e))
			);
	}

	logout() {
		this.document.cookie =
			'ACCESS_TOKEN=null; expires=Thu, 01 Jan 1970 00:00:01 GMT';
		this.document.cookie =
			'REFRESH_TOKEN=null; expires=Thu, 01 Jan 1970 00:00:01 GMT';
		this.document.cookie = 'EMAIL=null; expires=Thu, 01 Jan 1970 00:00:01 GMT';
		this._user$.next({ accessToken: '', email: '', refreshToken: '' });
		this.router.navigate(['/authenticate']);
	}

	private handleAuthError(error: Error) {
		if (error instanceof HttpErrorResponse) {
			const errorMessage = error.error.error?.message || EAuthError.DEFAULT;
			return throwError(errorMessage);
		}

		return throwError(EAuthError.DEFAULT);
	}

	private getCookie(cookieName: string): string | undefined {
		const cookieValue = this.document.cookie
			.split(';')
			.find(row => row.startsWith(cookieName))
			?.split('=')[1];

		return cookieValue;
	}

	private saveAuthResponse(response: IAuthResponse) {
		const { email, idToken: accessToken, refreshToken, expiresIn } = response;
		this.document.cookie = `ACCESS_TOKEN=${accessToken}; max-age=${expiresIn}`;
		this.document.cookie = `REFRESH_TOKEN=${refreshToken}`;
		this.document.cookie = `EMAIL=${email}`;
		this._user$.next({ accessToken, email, refreshToken });
	}
}
