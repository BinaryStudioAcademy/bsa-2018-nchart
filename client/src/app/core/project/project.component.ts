import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import * as fromCharts from '@app/store/actions/charts/charts.actions';
import { CreateDraftProject } from '@app/store/actions/projects/projects.actions';
import { isProjectDataset } from '@app/store/selectors/projects.selectors';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit, OnDestroy {
	showCharts = false;
	showTable = false;

	disconnect: () => void;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: isReady => {
					this.showTable = isReady;
				},
				selector: isProjectDataset()
			},
		]);
		this.storeService.dispatch(new fromCharts.LoadData());
		this.storeService.dispatch(new CreateDraftProject());
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
