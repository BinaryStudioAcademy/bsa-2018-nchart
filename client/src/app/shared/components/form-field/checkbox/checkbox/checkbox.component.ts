import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements OnInit {
	@Input() control: FormControl;
	@Input() label: string;
	@Input() value: any;
	@Input() disabled: boolean;
	@Input() checked: string;
	@Input() selectedValues: string[];

	constructor() {}

	isDisabled() {
		if (this.disabled) {
			this.control.disable();
		}
		return this.disabled;
	}

	ngOnInit() {}
}
