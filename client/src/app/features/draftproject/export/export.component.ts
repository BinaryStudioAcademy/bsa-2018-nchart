import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
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
import { getActiveChartId } from '@app/store/selectors/userCharts';
import { SaveSvgAction } from '@app/store/actions/svg/svg.actions';
import { SvgFile } from '@app/models/svg.model';
import { addedNewSvg } from '@app/store/selectors/svg.selector';
import { TouchSequence } from 'selenium-webdriver';

@Component({
	selector: 'app-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.sass']
})
export class ExportComponent implements OnInit, OnDestroy {
	@Input()
	isLoading = false;
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
	CurrSvg : string;
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
		this.disconnect = this.storeService.connect([
			{
				subscriber: isExporting => {
					this.isLoading = isExporting;
				},
				selector: isProjectExporting()
			},
			{
				selector: getActiveChartId(),
				subscriber: id => {
					if(id)
						this.exportSvgBus.requestSvg();
				}
			},
			// {
			// 	selector: addedNewSvg(),
			// 	subscriber : res =>
			// 	{console.log(res)}
			// }
		]);
		this.exportBusResponse = this.exportSvgBus.responseObservable.subscribe(
			svg => {
				this.CurrSvg = svg;
				this.svgFormControl.setValue(svg);
				//  let temp = Object.create(SvgFile);	
				//  temp.id = this.pageId;
				//  temp.svg = Object.assign(svg);
				//  this.CurrSvg = JSON.parse(JSON.stringify(svg));
				//  this.svgFormControl.setValue([...temp.svg]);
				//this.storeService.dispatch(new SaveSvgAction({svg : temp}));
				if (this.isLoadTab) {
					const filename = this.controlName.value.trim();
					const type = this.controlType.value as ExportType;
					this.storeService.dispatch(
						new ExportProject({ id: 1, type, filename, svg })
					);
				}
			}
		);
	}

	ngOnDestroy() {
		this.disconnect();
		this.exportBusResponse.unsubscribe();
	}

	onTabChange(event) {
		event.index !== 0 ? (this.isLoadTab = false) : (this.isLoadTab = true);

		if (event.index === 1) {
			this.exportSvgBus.requestSvg();
		}
	}

	exportData() {
		this.exportSvgBus.requestSvg();
	}

	copyToClipBoard() {
		this.clipboardService.copyFromContent(this.CurrSvg);
		this.storeService.dispatch(new NotificationSvgClipboard());
	}
}
