import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	@ViewChild('authForm') authForm!: NgForm;

	constructor() {}

	isLoginMode = true;

	ngOnInit(): void {}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit() {
		console.log(this.authForm.value);
		this.authForm.reset();
	}
}
