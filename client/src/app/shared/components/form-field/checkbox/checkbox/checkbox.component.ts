import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements OnInit {
	@Input()
	control: FormControl;
	@Input()
	label: string;
	@Input()
	value: any;
	@Input()
	disabled: boolean;
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
