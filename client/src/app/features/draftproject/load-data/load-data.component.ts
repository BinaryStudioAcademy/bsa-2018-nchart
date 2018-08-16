import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { requiredValidator, patternValidator } from '../../../shared/components/form-field/form-validators';
import {HttpService} from '@app/api/http/http.service';
import * as fromLoadedData from '@app/store/actions/loaded-data/loaded-data.actions';
import {StoreService} from '@app/services/store.service';

@Component({
	selector: 'app-load-data',
	templateUrl: './load-data.component.html',
	styleUrls: ['./load-data.component.sass']
})
export class LoadDataComponent implements OnInit {

	pasteDataControl = new FormControl('', Validators.required);

	pasteUrlControl = new FormControl('', [
		patternValidator('Invalid URL', RegExp('https?://.+')),
		requiredValidator('URL can`t be empty')
	]);

	constructor(
		private httpService: HttpService,
		private storeService: StoreService,
	) { }

	ngOnInit() {
	}

	loadFile(event) {
		const fileKey = event.files[0];
		this.storeService.dispatch(new fromLoadedData.LoadData({fileKey}));
	}

	loadUrl() {
		if (this.pasteUrlControl.valid) {
			const link = this.pasteUrlControl.value;
			this.storeService.dispatch(new fromLoadedData.LoadData({link}));
		}
	}

	pasteData() {
		if (this.pasteDataControl.valid) {
			const text = this.pasteDataControl.value;
			this.storeService.dispatch(new fromLoadedData.LoadData({text}));
		}
	}

}
