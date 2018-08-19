import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FormService } from '@app/services/form.service';

import {
	requiredValidator,
	emailValidator,
	patternValidator,
	maxLengthValidator,
	minLengthValidator,
	passwordValidator,
	passwordMatchValidator
} from '@app/shared/components/form-field/form-validators';

import { OptionalType, fieldsValidators } from '@app/models';
import { Login } from '@app/models/login.model';
import { Register } from '@app/models/register.model';

@Injectable()
export class LoginService {
	constructor(
		private formService: FormService,
		private formBuilder: FormBuilder
	) {}

	createLoginForm(): FormGroup {
		const initialValues: OptionalType<Login> = new Login();
		const validators: fieldsValidators<Login> = {
			email: [requiredValidator(), emailValidator()],
			password: [requiredValidator()]
		};

		const controls = this.formService.createFormControls(
			initialValues,
			validators
		);

		return this.formBuilder.group(controls);
	}

	createRegisterForm(): FormGroup {
		const initialValues: OptionalType<Register> = new Register();

		const validators: fieldsValidators<Register> = {
			name: [
				requiredValidator(),
				patternValidator(
					'Name should contain uppercase, lowercase characters and number',
					/^[a-zа-яэіїє]+$/i
				),
				maxLengthValidator('Maximum length of name is', 100)
			],
			email: [requiredValidator(), emailValidator()],
			password: [
				requiredValidator(),
				minLengthValidator('Minimum length of password is', 5),
				passwordValidator()
			],
			confirmPassword: []
		};

		const controls = this.formService.createFormControls(
			initialValues,
			validators
		);

		const passwordControl = controls['password'];

		controls['confirmPassword'].setValidators([
			requiredValidator(),
			passwordMatchValidator(passwordControl)
		]);

		return this.formBuilder.group(controls);
	}
}
