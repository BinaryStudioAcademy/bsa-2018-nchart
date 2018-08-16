import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-customize-chart',
	templateUrl: './customize-chart.component.html',
	styleUrls: ['./customize-chart.component.sass']
})
export class CustomizeChartComponent implements OnInit {
	constructor() {}

	control = new FormControl({ value: '', disabled: false });

	ngOnInit() {}
}
