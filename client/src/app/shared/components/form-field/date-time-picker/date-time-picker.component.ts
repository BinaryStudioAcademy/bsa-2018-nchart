import { EventEmitter, Output } from '@angular/core';
import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy
} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
	selector: 'app-date-time-picker',
	templateUrl: './date-time-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePickerComponent implements OnInit {
	@Input()
	dateRange: Date[];
	@Output()
	dateRangeChange = new EventEmitter<Date[]>();

	@Input()
	fromControl: FormControl;
	@Input()
	toControl: FormControl;

	constructor() {}
	ngOnInit() {}

	onDateChange(date) {
		this.dateRange = date;
		this.dateRangeChange.emit(this.dateRange);
	}
}
