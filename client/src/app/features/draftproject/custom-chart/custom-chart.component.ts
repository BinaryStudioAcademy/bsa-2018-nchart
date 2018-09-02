import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { StoreService } from '@app/services/store.service';
import {
	getData,
	getCustomizeSettings,
	getActiveChart
} from '@app/store/selectors/userCharts';
import { FormGroup } from '@angular/forms';
import { CustomizeControl } from '@app/models/customize-control.model';

@Component({
	selector: 'app-custom-chart',
	templateUrl: './custom-chart.component.html',
	styleUrls: ['./custom-chart.component.sass']
})
export class CustomChartComponent implements OnInit, OnDestroy {
	constructor(
		private barChartService: BarChartService,
		private storeService: StoreService
	) {}

	data: any[];
	disconnect: () => void;
	customizeSettings;
	chartType: string;
	customizeForm: FormGroup;
	customizeControls: CustomizeControl[];
	display = false;

	showDialog() {
		this.display = true;
	}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: getActiveChart(),
				subscriber: t => {
					this.chartType = t.sysName;
				}
			},
			{
				selector: getCustomizeSettings(),
				subscriber: t => {
					this.customizeSettings = t;
				}
			},
			{
				selector: getData(),
				subscriber: data => {
					switch (this.chartType) {
						case 'barChart':
							this.data = this.barChartService.getData(data);
							this.customizeForm = this.barChartService.createBarChartCustomizeForm(
								this.customizeSettings
							);
							this.customizeControls = this.barChartService.getCustomizeControls(
								this.customizeForm
							);
							break;

						default:
							break;
					}
				}
			}
		]);
	}
	ngOnDestroy() {
		this.disconnect();
	}
}
