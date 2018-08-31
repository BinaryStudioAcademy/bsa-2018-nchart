import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-toggle',
	templateUrl: './toggle.component.html'
})
export class ToggleComponent implements OnInit {
	@Input()
	name: string;
	@Input()
	control?: FormControl;

	constructor() {}

	ngOnInit() {}
}
