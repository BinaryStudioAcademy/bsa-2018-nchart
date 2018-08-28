import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { StoreService } from '@app/services/store.service';
import {
	getData,
	getCustomizeSettings,
	getActiveChart
} from '@app/store/selectors/userCharts';

@Component({
	selector: 'app-custom-chart',
	templateUrl: './custom-chart.component.html',
	styleUrls: ['./custom-chart.component.sass']
})
export class CustomChartComponent implements OnInit, OnDestroy {
	constructor(
		private barChartService: BarChartService,
		private storeService: StoreService
	) {}

	data: any[];
	disconnect: () => void;
	customizeSettings;
	chartType: string;

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: getActiveChart(),
				subscriber: t => {
					this.chartType = t.sysName;
				}
			},
			{
				selector: getData(),
				subscriber: data => {
					switch (this.chartType) {
						case 'barChart':
							this.data = this.barChartService.getData(data);
							break;

						default:
							break;
					}
				}
			},
			{
				selector: getCustomizeSettings(),
				subscriber: t => {
					this.customizeSettings = t;
				}
			}
		]);
	}
	ngOnDestroy() {
		this.disconnect();
	}
}
