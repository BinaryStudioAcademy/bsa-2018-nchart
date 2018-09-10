import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
	selector: 'app-date-time-picker',
	templateUrl: './date-time-picker.component.html'
})
export class DateTimePickerComponent implements OnInit {
	@Input()
	control: FormControl;

	constructor() {}

	ngOnInit() {}
}
