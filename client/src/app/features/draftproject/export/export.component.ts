import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	requiredValidator,
	patternValidator
} from '../../../shared/components/form-field/form-validators';

@Component({
	selector: 'app-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.sass']
})
export class ExportComponent implements OnInit {
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

	constructor() {}

	ngOnInit() {}

	exportData() {
		this.fileName = this.controlName.value.trim();
		this.fileType = this.controlType.value || this.fileType;
		this.file = this.fileName + '.' + this.fileType;
	}
}
