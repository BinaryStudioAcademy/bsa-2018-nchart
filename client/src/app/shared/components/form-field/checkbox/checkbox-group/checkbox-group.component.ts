import { Component, OnInit, Input } from '@angular/core';

interface Checks {
	label: string;
	value: any;
	disabled: boolean;
}

@Component({
	selector: 'app-checkbox-group',
	templateUrl: './checkbox-group.component.html'
})
export class CheckboxGroupComponent implements OnInit {
	@Input()
	checks: Checks[];
	@Input()
	selectedValues: string[];

	constructor() {}

	ngOnInit() {}
}
