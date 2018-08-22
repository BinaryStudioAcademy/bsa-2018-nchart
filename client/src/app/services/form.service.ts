import { Injectable } from '@angular/core';
import {
	FormControl,
	AbstractControlOptions,
	AbstractControl
} from '@angular/forms';
import {
	OptionalType,
	fieldsValidators
} from '@app/models/fields-validators.model';

@Injectable()
export class FormService {
	constructor() {}

	createFormControls<T>(
		initialValues: OptionalType<T>,
		validators: fieldsValidators<OptionalType<T>>
	): { [key: string]: AbstractControl } {
		return Object.keys(initialValues).reduce((previous, key) => {
			previous[key] = new FormControl(initialValues[key], validators[
				key
			] as AbstractControlOptions);
			return previous;
		}, {});
	}
}
