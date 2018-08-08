import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-text',
	templateUrl: './input-text.component.html'
})
export class InputTextComponent implements OnInit {
	@Input()
	disabled: string;
	@Input()
	label: string;
	@Input()
	errorMessage: string;
	@Input()
	control: FormControl;

	constructor() {}

	ngOnInit() {}

	isDisabled() {
		if (this.disabled) {
			this.control.disable();
		}
		return this.disabled;
	}
}
