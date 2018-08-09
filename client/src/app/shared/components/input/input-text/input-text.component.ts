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
	errorMessage: string;
	@Input()
	type: string;
	@Input()
	control: FormControl;
	@Input()
	icon: string;
	@Input()
	success: boolean;
	@Input()
	error: boolean;

	inputFocus = false;

	ngOnInit() {}

	isDisabled() {
		if (this.disabled) {
			this.control.disable();
		}
		return this.disabled;
	}
}
