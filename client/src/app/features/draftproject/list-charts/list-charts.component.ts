import { Component, OnInit } from '@angular/core';

export const charts = [
	{
		id: 1,
		name: 'Bar Chart',
		type: 'Other',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`
	},
	{
		id: 2,
		name: 'Bubble Chart',
		type: 'Other',
		description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`
	},
	{
		id: 3,
		name: 'Scatter Chart',
		type: 'Other',
		description: `Printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`
	},
	{
		id: 4,
		name: 'Line Chart',
		type: 'Other',
		description: `It is a long established fact that a reader will be at its layout.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`
	},
	{
		id: 5,
		name: 'Map Chart',
		type: 'Other',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					It is a long established fact that readable content of looking at its layout.`
	}
];

@Component({
	selector: 'app-list-charts',
	templateUrl: './list-charts.component.html',
	styleUrls: ['./list-charts.component.sass']
})
export class ListChartsComponent implements OnInit {
	chartList = charts;
	selectedChart = this.chartList[0];
	chartIconClass = this.getIconClasses(this.selectedChart.id);

	constructor() {}

	ngOnInit() {}

	selectChart(id): void {
		this.selectedChart = this.chartList.find(el => el.id === id);
		this.chartIconClass = this.getIconClasses(id);
	}

	getIconClasses(id) {
		const chartById = this.chartList.find(el => el.id === id);
		return {
			fas: true,
			'fa-chart-bar': 'Bar Chart' === chartById.name,
			'fa-braille': 'Bubble Chart' === chartById.name,
			'fa-ellipsis-h': 'Scatter Chart' === chartById.name,
			'fa-chart-line': 'Line Chart' === chartById.name,
			'fa-globe-americas': 'Map Chart' === chartById.name
		};
	}

	getClasses(id) {
		return {
			'chart-selected': id === this.selectedChart.id
		};
	}
}
