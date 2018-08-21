import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	requiredValidator,
	patternValidator
} from '../../../shared/components/form-field/form-validators';
import { Http, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';

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
		patternValidator('Invalid filename', RegExp('^[a-zA-Zа-яА-Я0-9_()#`.@-]+$')),
		requiredValidator('Filename can`t be empty')
	]);
	controlType = new FormControl('', [
		requiredValidator('')
	]);

	options = [{
		label: '.pdf',
		value: 'pdf'
	}, {
		label: '.svg',
		value: 'svg'
	}, {
		label: '.jpg',
		value: 'jpg'
	}, {
		label: '.png',
		value: 'png'
	}];

	configUrl: string = 'http://localhost:9000/api/project/1/export';
	constructor(private http: Http) {}

	ngOnInit() {}

	exportData() {
		this.fileName = this.controlName.value.trim();
		this.fileType = this.controlType.value || this.fileType;
		this.file = this.fileName + '.' + this.fileType;

		return this.http.get(this.configUrl, {
			responseType: ResponseContentType.Blob
		}).pipe(
			map(res => {
				return {
					filename: 'filename.pdf',
					data: res.blob()
				};
			})
		)
		.subscribe(res => {
			const url = window.URL.createObjectURL(res.data);
			const a = document.createElement('a');
			document.body.appendChild(a);
			a.setAttribute('style', 'display: none');
			a.href = url;
			a.download = res.filename;
			a.target = "_blank"
			a.click();
			window.URL.revokeObjectURL(url);
			a.remove();
		}, error => {
			console.log('download error:', JSON.stringify(error));
		}, () => {
			console.log('Completed file download.')
		});
	}
}
