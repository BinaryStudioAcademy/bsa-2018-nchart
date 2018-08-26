import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	requiredValidator,
	patternValidator
} from '@app/shared/components/form-field/form-validators';
import { StoreService } from '@app/services/store.service';
import { ExportType } from '@app/models/export.model';
import { ExportProject } from '@app/store/actions/export/export.actions';

@Component({
	selector: 'app-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.sass']
})
export class ExportComponent implements OnInit {
	controlName = new FormControl('', [
		patternValidator(
			'Invalid filename',
			RegExp('^[a-zA-Zа-яА-Я0-9_()#`.@-]+$')
		),
		requiredValidator('Filename can`t be empty')
	]);
	controlType = new FormControl(ExportType.PDF, [requiredValidator('')]);

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

	ngOnInit() {}

	exportData() {
		const filename = this.controlName.value.trim();
		const type = this.controlType.value as ExportType;

		this.storeService.dispatch(
			new ExportProject({ id: 1, type, filename })
		);
	}
}
