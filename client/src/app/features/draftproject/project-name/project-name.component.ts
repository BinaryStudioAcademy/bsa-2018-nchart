import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { requiredValidator } from '../../../shared/components/form-field/form-validators';

@Component({
	selector: 'app-project-name',
	templateUrl: './project-name.component.html',
	styleUrls: ['./project-name.component.sass']
})
export class ProjectNameComponent implements OnInit {
	projectName: string;
	isEditing = false;

	nameControl = new FormControl('', [requiredValidator('')]);

	constructor() {
		this.getProjectName();
	}

	ngOnInit() {}

	getProjectName(): void {
		// ... //
		this.projectName = 'Draft Project';
	}

	setProjectName() {
		// ... //
	}

	editProjectName() {
		this.isEditing = true;
		this.nameControl.setValue(this.projectName);
	}

	closeEditing() {
		this.isEditing = false;
		this.projectName = this.nameControl.value;

		this.setProjectName();
	}

	onEnterCloseEditing(event) {
		if (event.keyCode === 13 && this.nameControl.valid) {
			this.closeEditing();
		}
	}
}
