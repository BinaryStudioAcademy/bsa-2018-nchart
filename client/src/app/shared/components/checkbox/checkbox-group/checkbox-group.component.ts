import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-checkbox-group',
	templateUrl: './checkbox-group.html'
})
export class CheckboxGroupComponent implements OnInit {
	@Input()
	checks: Object[];
	@Input()
	selectedValues: string[];

	constructor() {}

	ngOnInit() {}
}
