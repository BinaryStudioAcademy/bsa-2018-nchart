import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	requiredValidator,
	patternValidator
} from '../../../shared/components/form-field/form-validators';
// tests
import { StoreService } from '@app/services/store.service';
import { Project } from '../../../models/project.model';
import { projects as projectsSelector } from '@app/store/selectors/projects.selectors';
import * as ProjectActions from '@app/store/actions/projects/projects.actions';

@Component({
	selector: 'app-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.sass']
})
export class ExportComponent implements OnInit, OnDestroy {
	fileName: string;
	fileType = 'pdf';
	file: string;
	// tests
	projects: Array<Project>;
	disconnect;

	controlName = new FormControl('', [
		patternValidator(
			'Invalid filename',
			RegExp('^[a-zA-Zа-яА-Я0-9_()#`.@-]+$')
		),
		requiredValidator('Filename can`t be empty')
	]);
	controlType = new FormControl('', [requiredValidator('')]);

	options = [
		{
			label: '.pdf',
			value: 'pdf'
		},
		{
			label: '.svg',
			value: 'svg'
		},
		{
			label: '.jpg',
			value: 'jpg'
		},
		{
			label: '.png',
			value: 'png'
		}
	];

	exportData() {
		this.fileName = this.controlName.value.trim();
		this.fileType = this.controlType.value || this.fileType;
		this.file = this.fileName + '.' + this.fileType;
	}

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: projects => {
					this.projects = projects;
				},
				selector: projectsSelector
			}
		]);
	}

	dispatchGetAll() {
		this.storeService.dispatch(new ProjectActions.LoadData());
	}

	dispatchOne() {
		this.storeService.dispatch(new ProjectActions.LoadData());
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
