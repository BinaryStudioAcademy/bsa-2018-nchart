import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-password',
	templateUrl: './input-password.html'
})
export class InputPasswordComponent implements OnInit {
	@Input()
	control: FormControl;

	constructor() {}

	ngOnInit() {}
}
