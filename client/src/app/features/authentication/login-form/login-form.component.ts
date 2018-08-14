import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
	requiredValidator,
	emailValidator
} from '@app/shared/components/form-field/form-validators';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {
	loginForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.loginForm = this.formBuilder.group({
			email: new FormControl('', [requiredValidator(), emailValidator()]),
			password: new FormControl('', [requiredValidator()])
		});
	}

	onClickLogin() {}
}
