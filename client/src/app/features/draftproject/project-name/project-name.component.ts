import { Component, OnInit, Output, OnChanges, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { requiredValidator, maxLengthValidator } from '@app/shared/components/form-field/form-validators';

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
	setProjectName: EventEmitter<any> = new EventEmitter();

	nameControl = new FormControl('', [
		requiredValidator(''),
		maxLengthValidator('Project name can`t be more than 40 symbols', 40)
	]);

	constructor() {}

	ngOnInit() {}

	ngOnChanges(changes) {
		this.nameControl.setValue(changes.projectName.currentValue);
	}

	editProjectName() {
		this.isEditing = true;
	}

	closeEditing() {
		this.isEditing = false;
		this.setProjectName.emit(this.nameControl.value);
	}

	onEnterCloseEditing(event) {
		if (event.keyCode === 13 && this.nameControl.valid) {
			this.closeEditing();
		} else if (event.keyCode === 27) {
			this.isEditing = false;
		}
	}
}
