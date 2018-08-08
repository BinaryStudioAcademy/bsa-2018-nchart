import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-dropdown-simple',
	templateUrl: './dropdown-simple.html'
})
export class DropdownSimpleComponent implements OnInit {
	@Input()
	control: FormControl;
	@Input()
	options: Object[];
	@Input()
	optionLabel: any;
	@Input()
	label: any;
	@Input()
	disabled: boolean;
	@Input()
	placeholder: string;
	@Input()
	group: boolean;

	constructor() {}

	isDisabled() {
		if (this.disabled) {
			this.control.disable();
		}
		return this.disabled;
	}

	ngOnInit() {}
}
