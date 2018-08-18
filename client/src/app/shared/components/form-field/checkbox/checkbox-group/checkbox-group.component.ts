import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Checks {
	label: string;
	value: any;
	control?: FormControl;
}

@Component({
	selector: 'app-checkbox-group',
	templateUrl: './checkbox-group.component.html'
})
export class CheckboxGroupComponent implements OnInit {
	@Input()
	checks: Checks[];
	@Input()
	checkedValues: string[];

	constructor() {}

	ngOnInit() {}
}
