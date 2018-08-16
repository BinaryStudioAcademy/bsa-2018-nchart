import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginService } from '@app/services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	registerForm: FormGroup;

	constructor(private loginService: LoginService) {}

	ngOnInit() {
		this.createForms();
	}

	private createForms() {
		this.loginForm = this.loginService.createLoginForm();
		this.registerForm = this.loginService.createRegisterForm();
	}

	resetForms() {
		this.loginForm.reset();
		this.registerForm.reset();
	}
}
