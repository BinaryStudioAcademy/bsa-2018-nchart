import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredValidator } from '@app/shared/components/form-field/form-validators';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import { StoreService } from '@app/services/store.service';

@Component({
	selector: 'app-dialog-rename',
	templateUrl: './dialog-rename.component.html',
	styleUrls: ['./dialog-rename.component.sass']
})
export class DialogRenameComponent implements OnInit {
	constructor(private storeService: StoreService) {}

	@Input()
	displayRename: boolean;
	@Output()
	displayRenameChange = new EventEmitter<boolean>();

	@Input()
	projectId: number;

	@Input()
	accessLevelId: number;

	formGroup: FormGroup;

	close() {
		this.displayRenameChange.emit(false);
	}

	ngOnInit() {
		this.formGroup = new FormGroup({
			name: new FormControl('', [requiredValidator()])
		});
	}

	rename(value) {
		this.storeService.dispatch(
			new projectActions.UpdateProjectName({
				id: this.projectId,
				name: value.name
			})
		);
		this.formGroup.reset();
		this.formGroup.setValue({
			name: null
		});
		this.displayRenameChange.emit(false);
	}
}
