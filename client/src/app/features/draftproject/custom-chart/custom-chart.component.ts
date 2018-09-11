import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { StoreService } from '@app/services/store.service';
import {
	getData,
	getCustomizeSettings,
	getActiveChart
} from '@app/store/selectors/userCharts';
import { FormGroup } from '@angular/forms';
import { PieChartService } from '@app/services/charts/pie-chart.service';
import { ScatterplotChartService } from '@app/services/charts/scatterplot-chart.service';
import { AlluvialDiagramChartService } from '@app/services/charts/alluvial-diagram-chart.service';
import { WorldMapChartService } from '@app/services/charts/world-map-chart.service';

@Component({
	selector: 'app-custom-chart',
	templateUrl: './custom-chart.component.html',
	styleUrls: ['./custom-chart.component.sass']
})
export class CustomChartComponent implements OnInit, OnDestroy {
	[x: string]: any;
	constructor(
		private barChartService: BarChartService,
		private pieChartService: PieChartService,
		private scatterplotChartService: ScatterplotChartService,
		private storeService: StoreService,
		private alluvialDiagramChartService: AlluvialDiagramChartService,
		private worldMapChartService: WorldMapChartService
	) {}

	data: any[];
	disconnect: () => void;
	customizeSettings;
	chartType: string;
	customizeForm: FormGroup;
	display = false;

	showDialog() {
		this.display = true;
	}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: getActiveChart(),
				subscriber: t => {
					if (t) {
						this.chartType = t.sysName;
					}
				}
			},
			{
				selector: getCustomizeSettings(),
				subscriber: t => {
					this.customizeSettings = t;
					switch (this.chartType) {
						case 'barChart':
							this.customizeForm = this.barChartService.createCustomizeForm(
								this.customizeSettings
							);
							break;
						case 'pieChart':
							this.customizeForm = this.pieChartService.createCustomizeForm(
								this.customizeSettings
							);
							break;
						case 'scatterplot':
							this.customizeForm = this.scatterplotChartService.createCustomizeForm(
								this.customizeSettings
							);
							break;
						case 'alluvialDiagram':
							this.customizeForm = this.alluvialDiagramChartService.createCustomizeForm(
								this.customizeSettings
							);
							break;
						case 'worldMap':
							this.customizeForm = this.worldMapChartService.createCustomizeForm(
								this.customizeSettings
							);
							break;
						default:
							break;
					}
				}
			},
			{
				selector: getData(),
				subscriber: data => {
					if (!!data.length) {
						switch (this.chartType) {
							case 'barChart':
								this.data = this.barChartService.getData(data);
								break;
							case 'pieChart':
								this.data = this.pieChartService.getData(data);
								break;
							case 'scatterplot':
								this.data = this.scatterplotChartService.getData(
									data
								);
								break;
							case 'alluvialDiagram':
								this.data = this.alluvialDiagramChartService.getData(
									data
								);
								break;
							case 'worldMap':
								this.data = this.worldMapChartService.getData(
									data
								);
								break;
							default:
								break;
						}
					}
				}
			}
		]);
	}
	ngOnDestroy() {
		this.disconnect();
	}
}
