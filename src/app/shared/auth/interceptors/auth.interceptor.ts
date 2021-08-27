import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return this.authService.user$.pipe(
			take(1),
			exhaustMap(user => {
				let params = request.params;
				params = params.append('auth', user.accessToken);
				const modifiedRequest = request.clone({ params });
				return next.handle(modifiedRequest);
			})
		);
	}
}
