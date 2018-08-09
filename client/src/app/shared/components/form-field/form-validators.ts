import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

interface ValidationMessage {
	[key: string]: any;
}

export function requiredValidator(msg?: string): ValidatorFn {
	return (control: AbstractControl): ValidationMessage => {
		if (Validators.required(control) && Validators.required(control).required) {
			return {
				required: msg || 'Required'
			};
		} else {
			return null;
		}
	};
}
