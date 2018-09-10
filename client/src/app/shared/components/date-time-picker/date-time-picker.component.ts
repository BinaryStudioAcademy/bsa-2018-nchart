import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-date-time-picker',
	templateUrl: './date-time-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePickerComponent implements OnInit {
	@Input()
	control: FormControl;
	public invalidDateTime = [];
	constructor() {}

	ngOnInit() {}
}
