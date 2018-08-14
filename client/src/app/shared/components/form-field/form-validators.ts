import {
	AbstractControl,
	ValidatorFn,
	Validators,
	ValidationErrors
} from '@angular/forms';

interface ValidationMessage {
	[key: string]: any;
}

function validatePattern(
	pattern: string | RegExp,
	control: AbstractControl
): ValidationErrors {
	return Validators.pattern(pattern).call(null, control);
}

export function requiredValidator(msg?: string): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		if (
			Validators.required(control) &&
			Validators.required(control).required
		) {
			return {
				required: msg || 'Required'
			};
		} else {
			return null;
		}
	};
}

export function minLengthValidator(
	msg?: string,
	minLength?: number
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		if (Validators.minLength(minLength)) {
			return {
				minLength: `${msg} ${minLength}`
			};
		} else {
			return null;
		}
	};
}

export function maxLengthValidator(
	msg?: string,
	maxLength?: number
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		if (Validators.maxLength(maxLength)) {
			return {
				minLength: `${msg} ${maxLength}`
			};
		} else {
			return null;
		}
	};
}

export function emailValidator(
	msg?: string,
	emailPattern?: string | RegExp
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		/* tslint:disable-next-line */
		const defaultPattern = /^((([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

		const validationErrors = emailPattern
			? validatePattern(emailPattern, control)
			: validatePattern(defaultPattern, control);

		if (validationErrors) {
			return {
				required: msg || 'Invalid email'
			};
		} else {
			return null;
		}
	};
}

export function pattertValidator(
	msg?: string,
	patternExpression?: string | RegExp
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		const validationErrors = validatePattern(patternExpression, control);
		if (validationErrors) {
			return {
				required: msg || 'Not match with pattern expression'
			};
		} else {
			return null;
		}
	};
}

export function passwordValidator(
	msg?: string,
	customPattern?: string | RegExp
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		const defaultPattern = /^(?=.*[a-zа-яэіїє])(?=.*[A-ZА-ЯЭІЇЄ])(?=.*\d)(?=.*[#$^+=!*()@%&]).+$/;

		const validationErrors = customPattern
			? validatePattern(customPattern, control)
			: validatePattern(defaultPattern, control);

		if (validationErrors) {
			return {
				required:
					msg ||
					'Password should contain alphabetic, numeric and special characters'
			};
		} else {
			return null;
		}
	};
}

export function passwordMatchValidator(
	password: AbstractControl,
	msg?: string
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		const passwordValue = password.value;
		const confirmPasswordValue = control.value;

		if (passwordValue !== confirmPasswordValue) {
			return {
				required: msg || 'Passwords aren`t match'
			};
		} else {
			return null;
		}
	};
}
