import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { requiredValidator, patternValidator } from '../../shared/components/form-field/form-validators';

@Component({
	selector: 'app-load-files',
	templateUrl: './load-files.component.html',
	styleUrls: ['./load-files.component.sass']
})
export class LoadFilesComponent implements OnInit {

	uploadedFiles: any[] = [];

	pasteDataControl = new FormControl('', Validators.required);

	pasteUrlControl = new FormControl('', [
		patternValidator('Invalid URL', RegExp('https?://.+')),
		requiredValidator('URL can`t be empty')
	]);

	onUpload(event) {
		for (const file of event.files) {
			this.uploadedFiles.push(file);
		}
	}

	loadUrl(event) {
		if (this.pasteUrlControl.valid) {

		}
	}

	pasteData(event) {
		if (this.pasteDataControl.valid) {

		}
	}

	constructor() { }

	ngOnInit() {
	}

}
