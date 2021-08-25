import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from '@env';
import { EAuthError, IAuthResponse } from '@models';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) {}

	signUp(email: string, password: string) {
		return this.http
			.post<IAuthResponse>(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.firebaseApiKey}`,
				{ email, password, returnSecureToken: true }
			)
			.pipe(catchError(e => this.handleAuthError(e)));
	}

	login(email: string, password: string) {
		return this.http
			.post<IAuthResponse>(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.firebaseApiKey}`,
				{ email, password, returnSecureToken: true }
			)
			.pipe(catchError(e => this.handleAuthError(e)));
	}

	private handleAuthError(error: Error) {
		if (error instanceof HttpErrorResponse) {
			const errorMessage = error.error.error?.message || EAuthError.DEFAULT;
			return throwError(errorMessage);
		}

		return throwError(EAuthError.DEFAULT);
	}
}
