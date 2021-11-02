import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env';
import { AuthModule } from '../auth.module';
import { IAuthResponse } from '../models';

@Injectable({
	providedIn: AuthModule
})
export class AuthApiService {
	constructor(private http: HttpClient) {}

	signUp(email: string, password: string) {
		return this.http.post<IAuthResponse>(
			'auth/signUp',
			{ email, password, returnSecureToken: true },
			{ params: { key: env.firebaseApiKey } }
		);
	}

	login(email: string, password: string) {
		return this.http.post<IAuthResponse>(
			'auth/login',
			{ email, password, returnSecureToken: true },
			{ params: { key: env.firebaseApiKey } }
		);
	}
}
