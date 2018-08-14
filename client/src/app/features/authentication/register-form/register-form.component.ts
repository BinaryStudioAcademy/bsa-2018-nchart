import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
	requiredValidator,
	maxLengthValidator,
	emailValidator,
	minLengthValidator,
	pattertValidator,
	passwordValidator,
	passwordMatchValidator
} from '@app/shared/components/form-field/form-validators';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {
	registerForm: FormGroup;

	private passwordControl = new FormControl('', [
		requiredValidator(),
		minLengthValidator('Minimum length of password is', 8),
		passwordValidator()
	]);

	private confirmPasswordControl = new FormControl('', [
		requiredValidator(),
		minLengthValidator('Minimum length of password is', 8),
		passwordValidator(),
		passwordMatchValidator(this.passwordControl)
	]);

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.registerForm = this.formBuilder.group({
			name: new FormControl('', [
				requiredValidator(),
				pattertValidator(
					'Name should contain only alphabetic characters',
					/^[a-zа-яэіїє]+$/i
				),
				maxLengthValidator('Maximum length of name is', 100)
			]),
			email: new FormControl('', [requiredValidator(), emailValidator()]),
			password: this.passwordControl,
			confirmPassword: this.confirmPasswordControl
		});
	}

	onClickCreateProfile() {}
}
