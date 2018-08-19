import { Component, OnInit } from '@angular/core';
import { ChartService } from '@app/services/chart.service';
import { Subscription } from 'rxjs';
import { BarChartCustomizeSettings } from '@app/shared/components/charts/bar-chart/bar-chart'
@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass']
})

export class ChartComponent implements OnInit {
	constructor(private _chartService: ChartService) {}
	barChartCustomizeSettings: BarChartCustomizeSettings;
	data: Array<any>;
	range: number;
	subs = new Subscription();
	ngOnInit() {
		this.subs.add(this._chartService.dataObs.subscribe(data => {
			this.data = data;
		}))

		this.subs.add(this._chartService.rangeObs.subscribe(data => {
			this.range = data;
		}))

		this.subs.add(this._chartService.barChartCustomizeSettingsObs.subscribe(data => {
			this.barChartCustomizeSettings = data;
		}));
	  
	}
	ngOnDestroy(){
		this.subs.unsubscribe;
	}



}


