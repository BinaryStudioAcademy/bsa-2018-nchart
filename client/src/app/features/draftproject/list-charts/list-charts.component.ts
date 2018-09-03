import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { getListChart } from '@app/store/selectors/charts.selectors';
import { SelectChart } from '@app/store/actions/charts/charts.actions';
import { SchemeID } from '@app/models/normalizr.model';
import {
	getCustomizeSettings,
	getActiveChart
} from '@app/store/selectors/userCharts';

interface Chart {
	id: SchemeID;
	name: string;
	sysName: string;
	type: string;
	desription: string;
}

@Component({
	selector: 'app-list-charts',
	templateUrl: './list-charts.component.html',
	styleUrls: ['./list-charts.component.sass']
})
export class ListChartsComponent implements OnInit, OnDestroy {
	chartList: Chart[];
	selectedChart: Chart;
	chartIconClass: any;
	customize: any;
	disconnect: () => void;

	constructor(private storeService: StoreService, element: ElementRef) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: getListChart(),
				subscriber: list => {
					if (list) {
						this.chartList = list;
					}
				}
			},
			{
				selector: getCustomizeSettings(),
				subscriber: t => {
					this.customize = t;
				}
			},
			{
				selector: getActiveChart(),
				subscriber: selectedChart => {
					if (selectedChart) {
						this.selectedChart = selectedChart;
						this.chartIconClass = this.getIconClasses(
							this.selectedChart
						);
					}
				}
			}
		]);
	}

	selectChart(id): void {
		this.storeService.dispatch(new SelectChart({ id }));
	}

	getIconClasses(c) {
		return {
			fas: true,
			'fa-chart-bar': 'barChart' === c.sysName,
			'fa-chart-pie': 'pieChart' === c.sysName,
			'fa-random': 'alluvialDiagram' === c.sysName,
			'fa-align-left': 'ganttChart' === c.sysName,
			'fa-chart-line': 'scatterplot' === c.sysName
		};
	}

	getClasses(id) {
		if (this.selectedChart) {
			return {
				'chart-selected': id === this.selectedChart.id
			};
		}
	}

	ngOnDestroy(): void {
		this.disconnect();
	}
}
