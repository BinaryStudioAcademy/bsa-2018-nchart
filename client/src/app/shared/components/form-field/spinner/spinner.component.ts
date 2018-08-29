import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {
	@Input()
	step: number;
	@Input()
	min: number;
	@Input()
	max: number;
	@Input()
	disabled: boolean;
	@Input()
	label: string;
	@Input()
	placeholder = '';
	@Input()
	type: string;
	@Input()
	control: FormControl;
	@Input()
	icon: string;

	ngOnInit() {}

	constructor() {}

	isDisabled() {
		if (this.disabled) {
			this.control.disable();
		}
		return this.disabled;
	}

	getError() {
		const { errors } = this.control;

		return errors && errors[Object.keys(errors)[0]];
	}

	getClasses() {
		return {
			[`ui-input-${
				this.control.valid
					? 'success'
					: this.control.dirty
						? 'error'
						: ''
			}`]: true
		};
	}
}
