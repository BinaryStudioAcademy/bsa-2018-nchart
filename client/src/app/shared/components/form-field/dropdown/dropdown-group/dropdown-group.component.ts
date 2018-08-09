import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-dropdown-group',
	templateUrl: './dropdown-group.html'
})
export class DropdownGroupComponent implements OnInit {

	@Input() control: FormControl;
	@Input() options: Object[];
	@Input() label: any;
	@Input() disabled: string;
	@Input() placeholder: string;

	constructor() {}

	isDisabled() {
		if (this.disabled) {
			this.control.disable();
		}
		return this.disabled;
	}

	ngOnInit() {
	}

}
