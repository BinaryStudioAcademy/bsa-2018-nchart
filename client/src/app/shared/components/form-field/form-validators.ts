import {
	AbstractControl,
	ValidatorFn,
	Validators,
	ValidationErrors,
	FormControl
} from '@angular/forms';
import { isNumber } from 'util';

interface ValidationMessage {
	[key: string]: any;
}

function validatePattern(
	pattern: string | RegExp,
	control: AbstractControl
): ValidationErrors {
	return Validators.pattern(pattern)(control);
}

const trimControl = (control: AbstractControl) =>
	control.value ? new FormControl(control.value.trim()) : control;

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
		const validationErrors = Validators.minLength(minLength)(control);

		return validationErrors ? { minLength: `${msg} ${minLength}` } : null;
	};
}

export function minValidator(msg?: string, min?: number): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		const validationErrors =
			(control.value !== undefined && isNaN(control.value)) ||
			!isNumber(control.value) ||
			control.value < min;
		return validationErrors ? { min: `${msg} ${min}` } : null;
	};
}

export function maxLengthValidator(
	msg?: string,
	maxLength?: number
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		const validationErrors = Validators.maxLength(maxLength)(
			trimControl(control)
		);

		return validationErrors ? { maxLength: `${msg} ${maxLength}` } : null;
	};
}

export function emailValidator(
	msg?: string,
	emailPattern?: string | RegExp
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		/* tslint:disable-next-line */
		const defaultPattern = /^((([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

		const trimmedControl = trimControl(control);

		const validationErrors = emailPattern
			? validatePattern(emailPattern, trimmedControl)
			: validatePattern(defaultPattern, trimmedControl);

		return validationErrors ? { email: msg || 'Invalid email' } : null;
	};
}

export function patternValidator(
	msg?: string,
	patternExpression?: string | RegExp
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		const validationErrors = validatePattern(
			patternExpression,
			trimControl(control)
		);

		return validationErrors
			? { pattern: msg || 'Not match with pattern expression' }
			: null;
	};
}

export function passwordValidator(
	msg?: string,
	customPattern?: string | RegExp
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		const defaultPattern = /^(?=.*[a-zа-яэіїє])(?=.*[A-ZА-ЯЭІЇЄ])(?=.*\d).+$/;

		const trimmedControl = trimControl(control);

		const validationErrors = customPattern
			? validatePattern(customPattern, trimmedControl)
			: validatePattern(defaultPattern, trimmedControl);

		if (validationErrors) {
			return {
				passwordPattern:
					msg ||
					'Password should contain uppercase, lowercase characters and number'
			};
		}
		return null;
	};
}

export function passwordMatchValidator(
	password: AbstractControl,
	msg?: string
): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		const passwordValue = password.value;
		const confirmPasswordValue = control.value;

		return passwordValue !== confirmPasswordValue
			? { passwordMatch: msg || 'Passwords aren`t match' }
			: null;
	};
}
