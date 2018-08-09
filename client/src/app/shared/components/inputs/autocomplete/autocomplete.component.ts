import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-autocomplete',
	templateUrl: './input-textarea.component.html'
})
export class AutocompleteComponent implements OnInit {
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
