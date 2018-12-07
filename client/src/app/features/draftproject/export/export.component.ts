import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	requiredValidator,
	patternValidator
} from '@app/shared/components/form-field/form-validators';
import { StoreService } from '@app/services/store.service';
import { ExportType } from '@app/models/export.model';
import { ExportProject } from '@app/store/actions/export/export.actions';
import { isProjectExporting } from '@app/store/selectors/export.selectors';
import { ExportSvgBusService } from '@app/services/export-svg-bus.service';
import { Subscription } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';
import { NotificationSvgClipboard } from '@app/store/actions/notification/notification.actions';

@Component({
	selector: 'app-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.sass']
})
export class ExportComponent implements OnInit, OnDestroy,OnChanges {
	@Input()
	isLoading = false;
	@Input()
	svgFile;

	svgFormControl: FormControl;
	exportBusResponse: Subscription;
	isLoadTab = true;
	controlName = new FormControl('', [
		patternValidator(
			'Invalid filename',
			RegExp('^[a-zA-Zа-яА-Я0-9_()#`.@-]+$')
		),
		requiredValidator('Filename can`t be empty')
	]);
	pageId : any;
	activeTabIndex;

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

	constructor(
		private storeService: StoreService,
		private exportSvgBus: ExportSvgBusService,
		private clipboardService: ClipboardService
	) {}

	ngOnInit() {
		this.svgFormControl = new FormControl('');
		this.svgFormControl.setValue(this.svgFile);
		this.disconnect = this.storeService.connect([
			{
				subscriber: isExporting => {
					this.isLoading = isExporting;
				},
				selector: isProjectExporting()
			}
		]);
	}

	ngOnDestroy() {
		this.exportBusResponse.unsubscribe();
		this.disconnect();
	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}){
		this.svgFormControl = new FormControl('');
		this.svgFormControl.setValue(changes.svgFile.currentValue);
	}

	onTabChange(event) {
		event.index !== 0 ? (this.isLoadTab = false) : (this.isLoadTab = true);

		if (event.index === 1) {
			this.exportSvgBus.requestSvg();
		}
	}

	exportData() {
		const filename = this.controlName.value.trim();
		const type = this.controlType.value as ExportType;
		this.storeService.dispatch(
						new ExportProject({ id: 1, type, filename, svg : this.svgFile })
					);
	}

	copyToClipBoard() {
		this.clipboardService.copyFromContent(this.svgFile);
		this.storeService.dispatch(new NotificationSvgClipboard());
	}
}
