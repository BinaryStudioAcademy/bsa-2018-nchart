import {
	Component,
	Input,
	Output,
	ElementRef,
	EventEmitter,
	// forwardRef,
	ViewChild,
	ChangeDetectorRef
} from '@angular/core';
import {
	// NG_VALUE_ACCESSOR,
	ControlValueAccessor,
	FormControl
} from '@angular/forms';

/* export const RADIO_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => RadioButtonComponent),
	multi: true
};*/

@Component({
	selector: 'app-radio-button',
	templateUrl: './radio-button.component.html'
	// providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioButtonComponent implements ControlValueAccessor {
	@Input()
	value: any;
	@Input()
	name: string;
	@Input()
	disabled: boolean;
	@Input()
	label: string;
	@Input()
	tabindex: number;
	@Input()
	inputId: string;
	@Input()
	style: any;
	@Input()
	styleClass: string;
	@Input()
	labelStyleClass: string;
	@Input()
	errorMessage: string;
	@Input()
	control: FormControl;
	@Output()
	click: EventEmitter<any> = new EventEmitter();

	@ViewChild('rb')
	inputViewChild: ElementRef;

	public checked: boolean;

	public focused: boolean;

	public onModelChange: Function = () => {};

	public onModelTouched: Function = () => {};

	constructor(private cd: ChangeDetectorRef) {}

	handleClick(event, radioButton, focus) {
		event.preventDefault();

		if (this.disabled) {
			return;
		}

		this.select();

		if (focus) {
			radioButton.focus();
		}
	}

	select() {
		if (!this.disabled) {
			this.click.emit(null);
			this.inputViewChild.nativeElement.checked = true;
			this.checked = true;
			this.onModelChange(this.value);
		}
	}

	writeValue(value: any): void {
		this.checked = value === this.value;

		if (this.inputViewChild.nativeElement) {
			this.inputViewChild.nativeElement.checked = this.checked;
		}

		this.cd.markForCheck();
	}

	registerOnChange(fn: Function): void {
		this.onModelChange = fn;
	}

	registerOnTouched(fn: Function): void {
		this.onModelTouched = fn;
	}

	setDisabledState(val: boolean): void {
		this.disabled = val;
	}

	onFocus(event) {
		this.focused = true;
	}

	onBlur(event) {
		this.focused = false;
		this.onModelTouched();
	}

	onChange(event) {
		this.select();
	}
}
