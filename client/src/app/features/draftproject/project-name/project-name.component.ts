import { Component, OnInit, Output, OnChanges, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { requiredValidator } from '../../../shared/components/form-field/form-validators';

import { Actions } from '@ngrx/effects';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import { StoreService } from '@app/services/store.service';
import * as projectAction from '@app/store/actions/projects/projects.actions';

// import { projectName } from '@app/store/selectors/projects.selectors';

@Component({
	selector: 'app-project-name',
	templateUrl: './project-name.component.html',
	styleUrls: ['./project-name.component.sass']
})
export class ProjectNameComponent implements OnInit, OnChanges {
	isEditing = false;
	@Input()
	projectName: string;
	@Output()
	setName: EventEmitter<any> = new EventEmitter();

	nameControl = new FormControl(this.projectName, [requiredValidator('')]);

	constructor() {}

	ngOnInit() {
		this.nameControl.setValue(this.projectName);
	}

	ngOnChanges() {
		this.nameControl.setValue(this.projectName);
	}

	editProjectName() {
		this.isEditing = true;
	}

	closeEditing() {
		this.isEditing = false;
		this.setName.emit(this.nameControl.value);
	}

	onEnterCloseEditing(event) {
		if (event.keyCode === 13 && this.nameControl.valid) {
			this.closeEditing();
		} else if (event.keyCode === 27) {
			this.isEditing = false;
		}
	}
}
