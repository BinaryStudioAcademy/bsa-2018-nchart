import { Component, OnInit, Input } from '@angular/core';

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
	disabled: string;
	val: string;

	constructor() {}

	ngOnInit() {}
}
