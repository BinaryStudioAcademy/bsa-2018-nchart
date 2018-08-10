import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

interface ValidationMessage {
	[key: string]: any;
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
		if (control.value.length < minLength) {
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
		if (control.value.length > maxLength) {
			return {
				minLength: `${msg} ${maxLength}`
			};
		} else {
			return null;
		}
	};
}
