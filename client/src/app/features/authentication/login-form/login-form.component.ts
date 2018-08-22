import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Login } from '@app/models/login.model';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {
	@Input()
	loginForm: FormGroup;

	@Output()
	loginClick = new EventEmitter<Login>();

	constructor() {}

	ngOnInit() {}

	onClickLogin() {
		const user = this.loginForm.getRawValue() as Login;
		this.loginClick.emit(user);
	}
}
