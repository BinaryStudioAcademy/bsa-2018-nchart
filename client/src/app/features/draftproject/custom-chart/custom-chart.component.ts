import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { StoreService } from '@app/services/store.service';
import {
	getData,
	getCustomizeSettings,
	getActiveChart,
	isRequiredDimensionMatched
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
	barChartCustomizeSettings;
	switchCharts: string;
	isRequiredDimensionMatched: boolean;

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: getData(),
				subscriber: data => {
					this.data = this.barChartService.getData(data);
				}
			},
			{
				selector: getCustomizeSettings(),
				subscriber: t => {
					if (Object.keys(t).length !== 7) {
						this.barChartCustomizeSettings = {
							set1: 800,
							set2: 600,
							set3: 20,
							set4: 30,
							set5: false
						};
					} else {
						this.barChartCustomizeSettings = t;
					}
				}
			},
			{
				selector: getActiveChart(),
				subscriber: t => {
					this.switchCharts = t.sysName;
				}
			},
			{
				selector: isRequiredDimensionMatched(),
				subscriber: t => {
					this.isRequiredDimensionMatched = t;
				}
			}
		]);
	}
	ngOnDestroy() {
		this.disconnect();
	}
}
