import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {
	@Input()
	disabled: boolean;
	@Input()
	label: string;
	@Input()
	value: number;
	@Input()
	control?: FormControl;
	@Input()
	min: number;
	@Input()
	max: number;

	constructor() {}

	ngOnInit() {}
}
