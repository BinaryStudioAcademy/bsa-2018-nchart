import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
	selector: 'app-customize-chart',
	templateUrl: './customize-chart.component.html',
	styleUrls: ['./customize-chart.component.sass']
})
export class CustomizeChartComponent implements OnInit {
	@Input()
	formGroup: FormGroup;
	@Input()
	chartType: string;
	@Input()
	customizeSettings;

	constructor() {}

	ngOnInit() {}
}
