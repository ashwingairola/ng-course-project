import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { EAuthError, IAuthResponse } from 'src/app/shared/auth/models';
import { AuthService } from 'src/app/shared/auth/services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	@ViewChild('authForm') authForm!: NgForm;

	constructor(private router: Router, private authService: AuthService) {}

	isLoginMode = true;
	authStatus: 'idle' | 'pending' | 'rejected' | 'fulfilled' = 'idle';
	authError: EAuthError | null = null;
	authErrorTypes: typeof EAuthError = EAuthError;

	ngOnInit(): void {}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit() {
		if (this.authForm.invalid) {
			return;
		}

		const email = this.authForm.value.email;
		const password = this.authForm.value.password;

		const auth$: Observable<IAuthResponse> = this.isLoginMode
			? this.authService.login(email, password)
			: this.authService.signUp(email, password);

		this.authStatus = 'pending';
		auth$.subscribe(
			() => {
				this.authForm.reset();
				this.authStatus = 'fulfilled';
				this.authError = null;
				this.router.navigate(['/']);
			},
			(error: EAuthError) => {
				this.authStatus = 'rejected';
				this.authError = error;
			}
		);
	}

	onHandleError() {
		this.authError = null;
	}
}
