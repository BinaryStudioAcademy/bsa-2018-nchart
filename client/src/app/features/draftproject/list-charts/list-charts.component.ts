import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from '@app/services/store.service';
import {getListChart} from '@app/store/selectors/charts.selectors';
import {SelectChart} from '@app/store/actions/charts/charts.actions';

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
		description: `It is a long established fact that a reader will be
		 distracted by the readable content of a page when looking at its layout.`
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
export class ListChartsComponent implements OnInit, OnDestroy {

	chartList;
	selectedChart;
	chartIconClass;
	disconnect: () => void;

	constructor(
		private storeService: StoreService,
	) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: getListChart(),
				subscriber: (list) => {
					if (!list) return;
					this.chartList = list;
					this.selectedChart = this.chartList[0];
					this.chartIconClass = this.getIconClasses(this.selectedChart.id);
				}
			}
		])
	}

	selectChart(id): void {
		this.storeService.dispatch(new SelectChart({id}))
	}

	getIconClasses(id) {
		const chartById = this.chartList.find(el => el.id === id);
		return {
			fas: true,
			'fa-chart-bar': 'Bar chart' === chartById.name,
			'fa-braille': 'Bubble chart' === chartById.name,
			'fa-ellipsis-h': 'Scatter chart' === chartById.name,
			'fa-chart-line': 'Line chart' === chartById.name,
			'fa-globe-americas': 'Map chart' === chartById.name
		};
	}

	getClasses(id) {
		return {
			'chart-selected': id === this.selectedChart.id
		};
	}

	ngOnDestroy(): void {
		this.disconnect();
	}
}
