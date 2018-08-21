import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
	requiredValidator,
	patternValidator
} from '../../../shared/components/form-field/form-validators';
import {StoreService} from '@app/services/store.service';
import {
	ChangeContent, ChangeHeaderTitle, ParseByFile, ParseByLink,
	ParseByText
} from '@app/store/actions/datasets/datasets.actions';
// import { StoreService } from '@app/services/store.service';

@Component({
	selector: 'app-load-data',
	templateUrl: './load-data.component.html',
	styleUrls: ['./load-data.component.sass']
})
export class LoadDataComponent implements OnInit {
	activeTab: number;

	pasteDataControl = new FormControl('', Validators.required);

	pasteUrlControl = new FormControl('', [
		patternValidator('Invalid URL', RegExp('https?://.+')),
		requiredValidator('URL can`t be empty')
	]);

	constructor(
		private storeService: StoreService
	) {}

	loadFile(event) {
		const file = event.files[0];
		this.storeService.dispatch(new ParseByFile({file}));
	}

	onChange(e) {
		this.activeTab = e.index;
	}

	ngOnInit() {}

	loadUrl() {
		if (this.pasteUrlControl.valid) {
			const link = this.pasteUrlControl.value;
			this.storeService.dispatch(new ParseByLink({link}));
		}
	}

	pasteData() {
		if (this.pasteDataControl.valid) {
			const text = this.pasteDataControl.value;
			this.storeService.dispatch(new ParseByText({text}));
		}
	}

	edit() {
		this.storeService.dispatch(new ChangeHeaderTitle({
			id: 1,
			title: 'This is new title'
		}))
	}

	editC() {
		this.storeService.dispatch(new ChangeContent({
			id: '0-0-1',
			value: 'This is new content'
		}))
	}
}
