import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-dropdown-simple',
	templateUrl: './dropdown-simple.component.html'
})
export class DropdownSimpleComponent implements OnInit {
	@Input()
	control: FormControl;
	@Input()
	options: any[];
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
	@Output()
	change: EventEmitter<any> = new EventEmitter();

	constructor() {}

	isDisabled() {
		if (this.disabled) {
			this.control.disable();
		}
		return this.disabled;
	}

	onChange(e) {
		this.change.emit(e);
	}

	ngOnInit() {}
}
