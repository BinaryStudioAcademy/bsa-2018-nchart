import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
	requiredValidator,
	emailValidator,
	minLengthValidator,
	passwordValidator,
	passwordMatchValidator,
	patternValidator,
	maxLengthValidator
} from '@app/shared/components/form-field/form-validators';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	registerForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: new FormControl('', [requiredValidator(), emailValidator()]),
			password: new FormControl('', [requiredValidator()])
		});

		const passwordControl = new FormControl('', [
			requiredValidator(),
			minLengthValidator('Minimum length of password is', 8),
			passwordValidator()
		]);

		const confirmPasswordControl = new FormControl('', [
			requiredValidator(),
			passwordMatchValidator(passwordControl)
		]);

		this.registerForm = this.formBuilder.group({
			name: new FormControl('', [
				requiredValidator(),
				patternValidator(
					'Name should contain only alphabetic characters',
					/^[a-zа-яэіїє]+$/i
				),
				maxLengthValidator('Maximum length of name is', 100)
			]),
			email: new FormControl('', [requiredValidator(), emailValidator()]),
			password: passwordControl,
			confirmPassword: confirmPasswordControl
		});
	}

	ngOnInit() {}

	resetForms() {
		this.loginForm.reset();
		this.registerForm.reset();
	}
}
