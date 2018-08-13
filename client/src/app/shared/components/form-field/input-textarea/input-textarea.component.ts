import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-textarea',
	templateUrl: './input-textarea.component.html'
})
export class InputTextareaComponent implements OnInit {
	@Input()
	rows: string;
	@Input()
	cols: string;
	@Input()
	autoResize: boolean;
	@Input()
	disabled: boolean;
	@Input()
	label: string;
	@Input()
	control?: FormControl;
	@Input()
	icon: string;
	@Input()
	placeholder: string = '';

	constructor() {}

	ngOnInit() {}
}
