import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ElementRef
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements OnInit {
	@Input()
	checkedAll;
	@Input()
	control: FormControl = new FormControl();
	@Input()
	label: string;
	@Input()
	value: boolean;
	@Input()
	disabled: boolean;
	@Output()
	change: EventEmitter<any> = new EventEmitter();

	constructor(el: ElementRef) {}

	isDisabled() {
		if (this.disabled) {
			this.control.disable();
		}
		return this.disabled;
	}

	onChange(e) {
		this.change.emit(e);
	}

	ngOnInit() {}
}
