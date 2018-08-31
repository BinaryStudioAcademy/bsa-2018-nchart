import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import {
	getData,
	getCustomizeSettings,
	getActiveChart,
	isRequiredDimensionMatched
} from '@app/store/selectors/userCharts';
import { ExportSvgBusService } from '@app/services/export-svg-bus.service';
import { Subscription } from 'rxjs';
import { BarChartComponent } from '@app/shared/components/charts/bar-chart/bar-chart.component';
@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit, OnDestroy {
	subscription: Subscription;

	@Input()
	data: any[];
	@Input()
	chartType: string;
	@Input()
	customizeSettings;

	@ViewChild('chart')
	chart: BarChartComponent;

	constructor(private exportSvgBus: ExportSvgBusService) {}

	ngOnInit() {
		this.subscription = this.exportSvgBus.requestObservable.subscribe(
			() => {
				this.exportSvgBus.sendSvg(
					this.chart.chart.nativeElement.innerHTML
				);
			}
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
