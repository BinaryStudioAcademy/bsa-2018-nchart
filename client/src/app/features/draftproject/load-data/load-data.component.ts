import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
	requiredValidator,
	patternValidator
} from '@app/shared/components/form-field/form-validators';

@Component({
	selector: 'app-load-data',
	templateUrl: './load-data.component.html',
	styleUrls: ['./load-data.component.sass']
})
export class LoadDataComponent implements OnInit {
	activeTab: number;

	uploadedFiles: any[] = [];

	pasteDataControl = new FormControl('', Validators.required);

	pasteUrlControl = new FormControl('', [
		patternValidator('Invalid URL', RegExp('https?://.+')),
		requiredValidator('URL can`t be empty')
	]);

	onUpload(event): void {
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

	onChange(event) {
		this.activeTab = event.index;
	}

	constructor() {}

	ngOnInit() {}
}
