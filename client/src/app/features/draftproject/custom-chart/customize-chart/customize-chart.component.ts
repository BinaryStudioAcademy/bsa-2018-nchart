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
	width: number = 500;
	height: number = 500;
	leftMargin:number = 40;
	horizontalPadding: number = 0.1;
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
	setLeftMargin(){
		this._chartService.setLeftMargin(this.leftMargin)
	}
	setHorizontalPadding(){
		this._chartService.setHorizontalPadding(this.horizontalPadding)
	}
	ngOnDestroy(){
		this.subs.unsubscribe;
	}

}
