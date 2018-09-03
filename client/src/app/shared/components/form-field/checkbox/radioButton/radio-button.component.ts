import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-radio-button',
	templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent implements OnInit {
	@Input()
	name: string;
	@Input()
	label: string;
	@Input()
	value: any;
	@Input()
	control: FormControl;

	constructor() {}

	ngOnInit() {}
}
