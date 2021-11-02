import {
	Component,
	ComponentFactoryResolver,
	Injector,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { noop, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { EAuthError } from 'src/app/modules/auth/models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PlaceholderDirective } from 'src/app/modules/shared/directives/placeholder.directive';
import { AlertComponent } from 'src/app/modules/UI/alert/components/alert/alert.component';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
	@ViewChild('authForm') authForm!: NgForm;
	@ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;
	@ViewChild('authErrorAlert') alertContent!: TemplateRef<any>;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private injector: Injector,
		private authService: AuthService
	) {}

	isLoginMode = true;
	authStatus$ = this.authService.authStatus$;
	authError: EAuthError | null = null;
	authErrorTypes: typeof EAuthError = EAuthError;

	private destroy$ = new Subject<void>();

	ngOnInit(): void {
		this.authService.authError$
			.pipe(takeUntil(this.destroy$))
			.subscribe(error => {
				this.authError = error;

				if (this.authError) {
					this.onShowAlert();
				}
			}, noop);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
	}

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
			this.authService.login(email, password);
		} else {
			this.authService.signUp(email, password);
		}
	}

	onShowAlert() {
		const alertComponentFactory =
			this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();
		const alertComponentRef = hostViewContainerRef.createComponent(
			alertComponentFactory,
			0,
			this.injector,
			[this.alertContent.createEmbeddedView(null).rootNodes]
		);

		alertComponentRef.instance.hide.pipe(take(1)).subscribe(() => {
			this.authError = null;
			hostViewContainerRef.clear();
		});
	}
}
