import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-radio-button',
	templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent implements OnInit {
	@Input()
	name: string;
	@Input()
	value: string;
	@Input()
	label: string;
	@Input()
	disabled: string;
	val: string;

	constructor() {}

	ngOnInit() {}
}
