import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BarChartCustomizeSettings } from '@app/shared/components/charts/bar-chart/bar-chart.model';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { StoreService } from '@app/services/store.service';
import { getData } from '@app/store/selectors/charts.selectors';
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
	barChartCustomizeSettings: BarChartCustomizeSettings;
	data: Array<any>;
	range: number;
	subs = new Subscription();
	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: getData(),
				subscriber: data => {
					this.data = this.barChartService.getData(data);
				}
			}
		]);

		this.subs.add(
			this.barChartService.dataObs.subscribe(data => {
				this.data = data;
			})
		);

		this.subs.add(
			this.barChartService.rangeObs.subscribe(data => {
				this.range = data;
			})
		);

		this.subs.add(
			this.barChartService.barChartCustomizeSettingsObs.subscribe(
				data => {
					this.barChartCustomizeSettings = data;
				}
			)
		);
	}

	ngOnDestroy() {
		this.subs.unsubscribe();
		this.disconnect();
	}
}
