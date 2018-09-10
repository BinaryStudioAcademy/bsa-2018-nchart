import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
		this.exportSvgBus.requestSvg();
		this.svgFormControl = new FormControl('');
		this.disconnect = this.storeService.connect([
			{
				subscriber: isExporting => {
					this.isLoading = isExporting;
				},
				selector: isProjectExporting()
			}
		]);
		this.exportBusResponse = this.exportSvgBus.responseObservable.subscribe(
			svg => {
				this.svgFormControl.patchValue(svg);
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
		this.clipboardService.copyFromContent(this.svgFormControl.value);
	}
}
