import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EAuthError } from '@models';
import { AuthService } from '../../../../services/api/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	@ViewChild('authForm') authForm!: NgForm;

	constructor(private authService: AuthService) {}

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

		if (this.isLoginMode) {
			return;
		} else {
			this.authStatus = 'pending';
			this.authService.signUp(email, password).subscribe(
				response => {
					console.log(response);
					this.authForm.reset();
					this.authStatus = 'fulfilled';
				},
				error => {
					this.authStatus = 'rejected';

					if (error instanceof HttpErrorResponse) {
						const errorMessage =
							error.error.error?.message || EAuthError.DEFAULT;
						this.authError = errorMessage;
					} else {
						this.authError = EAuthError.DEFAULT;
					}
				}
			);
		}
	}
}
