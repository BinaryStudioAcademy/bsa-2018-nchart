import { AbstractControl } from '@angular/forms';

export interface CustomizeControl {
	type: string;
	label: string;
	control: AbstractControl;
}
