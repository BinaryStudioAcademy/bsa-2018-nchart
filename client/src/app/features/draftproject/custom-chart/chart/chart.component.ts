import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
	chartType: string;
	@Input()
	customizeSettings;

	@ViewChild('chart')
	chart: ElementRef;

	constructor() {}

	ngOnInit() {}
}
