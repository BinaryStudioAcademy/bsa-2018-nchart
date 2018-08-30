import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { StoreService } from '@app/services/store.service';
import {
	getData,
	getCustomizeSettings,
	getActiveChart
} from '@app/store/selectors/userCharts';
import { FormGroup } from '@angular/forms';

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
	customizeForm: FormGroup;

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: getActiveChart(),
				subscriber: t => {
					this.chartType = t.sysName;
				}
			},
			{
				selector: getCustomizeSettings(),
				subscriber: t => {
					this.customizeSettings = t;
				}
			},
			{
				selector: getData(),
				subscriber: data => {
					switch (this.chartType) {
						case 'barChart':
							this.data = this.barChartService.getData(data);
							this.customizeForm = this.barChartService.createBarChartCustomizeForm(
								this.customizeSettings
							);
							break;

						default:
							break;
					}
				}
			}
		]);
	}
	ngOnDestroy() {
		this.disconnect();
	}
}
