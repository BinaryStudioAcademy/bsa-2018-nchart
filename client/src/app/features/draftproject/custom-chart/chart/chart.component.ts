import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {
	constructor() {}
	data: any;
	ngOnInit() {
		this.data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		.map((month: string) => ({
		  name: month,
		  value: Math.random() * 200
		}));
	}
}
