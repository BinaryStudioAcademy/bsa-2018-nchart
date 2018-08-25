import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { StoreService } from '@app/services/store.service';
import {
	getData,
	getCustomizeSettings
} from '@app/store/selectors/charts.selectors';
@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit, OnDestroy {
	constructor(
		private barChartService: BarChartService,
		private storeService: StoreService
	) {}

	disconnect: () => void;
	barChartCustomizeSettings;
	data: Array<any>;
	subs = new Subscription();

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
			}
		]);

		/*this.subs.add(
			this.barChartService.barChartCustomizeSettingsObs.subscribe(
				data => {
					this.barChartCustomizeSettings = data;
				}
			)
		);*/
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
		this.disconnect();
	}
}
