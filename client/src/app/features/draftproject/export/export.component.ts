import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	requiredValidator,
	patternValidator
} from '../../../shared/components/form-field/form-validators';
import { StoreService } from '@app/services/store.service';
import { ExportType } from '@app/models/export.model';
import { ExportProject } from '@app/store/actions/export/export.actions';
import { isProjectExporting } from '@app/store/selectors/export.selectors';

@Component({
	selector: 'app-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.sass']
})
export class ExportComponent implements OnInit, OnDestroy {
	@Input()
	isLoading = false;

	fileName: string;
	fileType = 'pdf';
	file: string;

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
			value: ExportType.PDF
		},
		{
			label: '.svg',
			value: ExportType.SVG
		},
		// {
		// 	label: '.jpg',
		// 	value: 'jpg'
		// },
		{
			label: '.png',
			value: ExportType.PNG
		}
	];
	disconnect: () => void;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: isExporting => {
					this.isLoading = isExporting
				},
				selector: isProjectExporting()
			}
		]);
	}

	ngOnDestroy(){
		this.disconnect();
	}

	exportData() {
		this.fileName = this.controlName.value.trim();
		this.fileType = this.controlType.value || this.fileType;
		this.file = this.fileName + '.' + this.fileType;

		// Add service for getting id of current export project
		this.storeService.dispatch(
			new ExportProject({
				id: 1,
				type: this.fileType as ExportType,
				filename: this.fileName
			})
		);
	}
}
