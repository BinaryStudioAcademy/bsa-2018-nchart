import { Component, OnInit } from '@angular/core';
import { ChartService } from '@app/services/chart.service';
import { BarChartCustomizeSettings } from '@app/shared/components/charts/bar-chart/bar-chart';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-customize-chart',
	templateUrl: './customize-chart.component.html',
	styleUrls: ['./customize-chart.component.sass']
})
export class CustomizeChartComponent implements OnInit {
	constructor(private _chartService: ChartService) {}
	width: number;
	height: number;
	barChartCustomizeSettings: BarChartCustomizeSettings;
	subs = new Subscription();
	ngOnInit() {
		
	}
	setWidth(){
		this._chartService.setWidth(this.width)
	}
	setHeight(){
		this._chartService.setHeight(this.height)
	}
	ngOnDestroy(){
		this.subs.unsubscribe;
	}

}
