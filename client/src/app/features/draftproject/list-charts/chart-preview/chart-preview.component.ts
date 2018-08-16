import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-chart-preview',
	templateUrl: './chart-preview.component.html',
	styleUrls: ['./chart-preview.component.sass']
})
export class ChartPreviewComponent implements OnInit {
	@Input()
	selectedChart: any;
	@Input()
	chartIconClass: string;

	constructor() {}

	ngOnInit() {}
}
