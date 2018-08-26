import { Component, OnInit, Input } from '@angular/core';
import {
	getData,
	getCustomizeSettings,
	getActiveChart,
	isRequiredDimensionMatched
} from '@app/store/selectors/userCharts';
@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {
	@Input()
	data: any[];
	@Input()
	switchCharts: string;
	@Input()
	barChartCustomizeSettings;

	constructor() {}

	ngOnInit() {}
}
