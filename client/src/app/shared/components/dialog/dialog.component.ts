import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
	requiredValidator,
	emailValidator
} from '@app/shared/components/form-field/form-validators';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import {StoreService} from '@app/services/store.service';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
	constructor(private storeService: StoreService) {
	}

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
			projectId: new FormControl(this.projectId),
			email: new FormControl('', [requiredValidator(), emailValidator()]),
			accessLevelId: new FormControl('3', [])
		});
	}

	share(value) {
		this.storeService.dispatch(
			new projectActions.ShareProject(value)
		);
		this.displayChange.emit(false);
	}
}
