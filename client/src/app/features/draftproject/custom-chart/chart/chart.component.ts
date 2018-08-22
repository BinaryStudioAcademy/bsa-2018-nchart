import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BarChartCustomizeSettings } from '@app/shared/components/charts/bar-chart/bar-chart.model';
import { BarChartService } from '@app/services/charts/bar-chart.service';
@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit, OnDestroy {
	constructor(private barChartService: BarChartService) {}
	barChartCustomizeSettings: BarChartCustomizeSettings;
	data: Array<any>;
	range: number;
	subs = new Subscription();
	ngOnInit() {
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
	}
}
