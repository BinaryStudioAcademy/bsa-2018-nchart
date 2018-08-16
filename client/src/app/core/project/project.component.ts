import { Component, OnInit } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { isChartsReady } from '@app/store/selectors/charts.selectors';
import { isModifiedDataReady } from '@app/store/selectors/modified-data.selectors';
import * as fromCharts from '@app/store/actions/charts/charts.actions';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
	showCharts = false;
	showTable = false;

	disconnect;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: isReady => {
					this.showCharts = isReady;
				},
				selector: isChartsReady
			},
			{
				subscriber: isReady => {
					this.showTable = isReady;
				},
				selector: isModifiedDataReady
			}
		]);
		this.storeService.dispatch(new fromCharts.LoadData());
	}
}
