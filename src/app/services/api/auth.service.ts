import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env';
import { IAuthResponse } from '@models';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) {}

	signUp(email: string, password: string) {
		return this.http.post<IAuthResponse>(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.firebaseApiKey}`,
			{ email, password, returnSecureToken: true }
		);
	}

	login(email: string, password: string) {
		return this.http.post<IAuthResponse>(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.firebaseApiKey}`,
			{ email, password, returnSecureToken: true }
		);
	}
}
