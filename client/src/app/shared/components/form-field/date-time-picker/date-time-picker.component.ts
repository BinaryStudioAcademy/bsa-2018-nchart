import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-date-time-picker',
	templateUrl: './date-time-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePickerComponent implements OnInit {
	@Input()
	dateControl: FormControl;

	constructor() {}

	public datePicked: Date[];
	ngOnInit() {
		console.log(this.dateControl);
	}
}
