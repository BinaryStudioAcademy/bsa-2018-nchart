import { Injectable } from '@angular/core';
import { FormControl, AbstractControlOptions } from '@angular/forms';
import { fieldsValidators, OptionalType } from '@app/models';

@Injectable()
export class FormService {
	constructor() {}

	createFormControls(
		initialValues: any,
		validators: fieldsValidators<OptionalType<any>>
	) {
		return Object.keys(initialValues).reduce((previous, key) => {
			previous[key] = new FormControl(initialValues[key], validators[
				key
			] as AbstractControlOptions);
			return previous;
		}, {});
	}
}
