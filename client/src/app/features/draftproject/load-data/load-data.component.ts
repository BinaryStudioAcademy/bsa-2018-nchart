import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
	requiredValidator,
	patternValidator
} from '@app/shared/components/form-field/form-validators';
import { StoreService } from '@app/services/store.service';
import {
	ParseByFile,
	ParseByLink,
	ParseByText,
	PreloadSamples,
	LoadSample
} from '@app/store/actions/datasets/datasets.actions';
import {
	isDatasetLoading,
	datasetPreloadSamples
} from '@app/store/selectors/dataset.selectors';

@Component({
	selector: 'app-load-data',
	templateUrl: './load-data.component.html',
	styleUrls: ['./load-data.component.sass']
})
export class LoadDataComponent implements OnInit {
	isLoading = false;

	activeTab: number;
	datasetSamples: any;

	pasteDataControl = new FormControl('', Validators.required);

	pasteUrlControl = new FormControl('', [
		patternValidator('Invalid URL', RegExp('https?://.+')),
		requiredValidator('URL can`t be empty')
	]);

	disconnect: () => void;

	constructor(private storeService: StoreService) {}

	onChange(e) {
		this.activeTab = e.index;
	}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: isLoading => {
					this.isLoading = isLoading;
				},
				selector: isDatasetLoading()
			},
			{
				subscriber: preloadSamples => {
					this.datasetSamples = preloadSamples;
				},
				selector: datasetPreloadSamples()
			}
		]);
		this.storeService.dispatch(new PreloadSamples());
	}

	loadFile(event) {
		const file = event.files[0];
		this.storeService.dispatch(new ParseByFile({ file }));
	}

	loadUrl() {
		if (this.pasteUrlControl.valid) {
			const link = this.pasteUrlControl.value;
			this.storeService.dispatch(new ParseByLink({ link }));
		}
	}

	pasteData() {
		if (this.pasteDataControl.valid) {
			const text = this.pasteDataControl.value;
			this.storeService.dispatch(new ParseByText({ text }));
		}
	}

	loadSample(e, item) {
		this.storeService.dispatch(new LoadSample({ id: item.id }));
	}
}
