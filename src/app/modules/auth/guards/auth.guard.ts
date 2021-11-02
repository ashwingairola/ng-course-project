import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthModule } from '../auth.module';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: AuthModule
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.authService.user$.pipe(
			take(1),
			map(user => {
				const isAuthenticated = !!user.accessToken;

				if (isAuthenticated) {
					return true;
				}

				return this.router.createUrlTree(['/authenticate']);
			})
		);
	}
}
