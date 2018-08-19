import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginService } from '@app/services/login.service';
import { StoreService } from '@app/services/store.service';
import { TokenService } from '@app/services/token.service';
import { VerifyToken } from '@app/store/actions/user/user.actions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	registerForm: FormGroup;

	constructor(
		private loginService: LoginService,
		private storeService: StoreService,
		private tokenService: TokenService
	) {}

	ngOnInit() {
		this.createForms();

		const token = this.tokenService.getToken();
		if (token) {
			this.storeService.dispatch(new VerifyToken({ token }));
		}
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
