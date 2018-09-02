import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
	requiredValidator,
	emailValidator
} from '@app/shared/components/form-field/form-validators';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
	@Input()
	display: boolean;
	@Output()
	displayChange = new EventEmitter<boolean>();

	@Input()
	projectId: number;

	@Input()
	accessLevelId: number;

	formGroup: FormGroup;

	// showDialog() {
	// 	this.display = true;
	// }

	close() {
		this.displayChange.emit(false);
	}

	ngOnInit() {
		this.formGroup = new FormGroup({
			email: new FormControl('', [requiredValidator(), emailValidator()]),
			accessLevel: new FormControl()
		});
	}
}
