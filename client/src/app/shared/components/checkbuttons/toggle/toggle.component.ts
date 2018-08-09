import {
	Component,
	Input,
	// forwardRef,
	EventEmitter,
	Output
} from '@angular/core';
import {
	// NG_VALUE_ACCESSOR,
	ControlValueAccessor
} from '@angular/forms';

/* export const TOGGLE_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ToggleComponent),
	multi: true
};*/

@Component({
	selector: 'app-toggle',
	template: './toggle.component.html'
	// providers: [TOGGLE_VALUE_ACCESSOR]
})
export class ToggleComponent implements ControlValueAccessor {
	@Input()
	style: any;
	@Input()
	styleClass: string;
	@Input()
	tabindex: number;
	@Input()
	inputId: string;
	@Input()
	name: string;
	@Input()
	disabled: boolean;
	@Output()
	change: EventEmitter<any> = new EventEmitter();

	checked = false;

	focused = false;

	onModelChange: Function = () => {};

	onModelTouched: Function = () => {};

	onClick(event: Event, cb: HTMLInputElement) {
		this.toggle(event);
		cb.focus();
	}

	onInputChange(event: Event) {
		const inputChecked = (<HTMLInputElement>event.target).checked;
		this.updateModel(inputChecked);
	}

	toggle(event: Event) {
		if (!this.disabled) {
			this.updateModel(!this.checked);
		}
	}

	updateModel(value: boolean) {
		this.checked = value;
		this.onModelChange(this.checked);
		this.change.emit({
			originalEvent: event,
			checked: this.checked
		});
	}

	onFocus(event: Event) {
		this.focused = true;
	}

	onBlur(event: Event) {
		this.focused = false;
		this.onModelTouched();
	}

	writeValue(checked: any): void {
		this.checked = checked;
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
}
