import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginService } from '@app/services/login.service';
import { StoreService } from '@app/services/store.service';
import { TokenService } from '@app/services/token.service';
import {
	VerifyToken,
	Login as LoginAction,
	Register as RegisterAction
} from '@app/store/actions/user/user.actions';
import { Login as LoginModel, Register as RegisterModel } from '@app/models';
import { isUserLoading } from '@app/store/selectors/user.selectors';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup;
	registerForm: FormGroup;

	isLoading = false;

	private storeDisconnect: () => void;

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

		this.storeDisconnect = this.storeService.connect([
			{
				subscriber: isLoading => {
					this.isLoading = isLoading;
				},
				selector: isUserLoading()
			}
		]);
	}

	private createForms() {
		this.loginForm = this.loginService.createLoginForm();
		this.registerForm = this.loginService.createRegisterForm();
	}

	resetForms() {
		this.loginForm.reset();
		this.registerForm.reset();
	}

	onLogin(loginModel: LoginModel) {
		const user = this.trimStringFields<LoginModel>(loginModel);
		this.storeService.dispatch(new LoginAction({ user }));
	}

	onRegister(registerModel: RegisterModel) {
		const user = this.trimStringFields<RegisterModel>(registerModel);
		this.storeService.dispatch(new RegisterAction({ user }));
	}

	private trimStringFields<T>(obj: T): T {
		return Object.keys(obj).reduce(
			(trimmedObj, key) => {
				const isString = typeof obj[key] === 'string';
				trimmedObj[key] = isString ? obj[key].trim() : obj[key];
				return trimmedObj;
			},
			{} as T
		);
	}

	ngOnDestroy(): void {
		this.storeDisconnect();
	}
}
