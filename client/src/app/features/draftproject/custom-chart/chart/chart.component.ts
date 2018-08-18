import { Component, OnInit } from '@angular/core';
import { ChartService } from '@app/services/chart.service';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass']
})



export class ChartComponent implements OnInit {
	constructor(private _chartService: ChartService) {}
	data: any;
	range: number;
	ngOnInit() {
		this.data = this._chartService.getXAxis();
		this.range = this._chartService.getRange();
		console.log(this.data);


		/*this.data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','May', 'Jun', 'Jul', 'Aug']
		.map((month: string) => (
			{
		  name: month,
		  value: Math.random() * 200
		  }
	));*/
	}
}


