import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-text',
	templateUrl: './input-text.component.html'
})
export class InputTextComponent implements OnInit {
	@Input()
	disabled: boolean;
	@Input()
	label: string;
	@Input()
	placeholder: string;
	@Input()
	type: string;
	@Input()
	control: FormControl;
	@Input()
	icon: string;
	@Input()
	iconPosition: string;
	@Input()
	showStates: boolean;

	ngOnInit() {}

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
			}`]: this.showStates
		};
	}

	getIconClasses() {
		return {
			'ui-input-icon-right': this.icon && !this.iconPosition,
			[`${this.icon}`]: this.icon,
			[`ui-input-icon-${this.iconPosition}`]: this.icon
		};
	}
}
