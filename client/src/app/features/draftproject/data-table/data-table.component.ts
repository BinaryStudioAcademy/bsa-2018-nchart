import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {StoreService} from '@app/services/store.service';
import {RemoveChart} from '@app/store/actions/charts/charts.actions';
import {RemovePageProject} from '@app/store/actions/projects/projects.actions';
import {isUserLoading} from '@app/store/selectors/user.selectors';
import {getActiveChartId} from '@app/store/selectors/userCharts';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit, OnDestroy {
	constructor(
		element: ElementRef,
		private storeService: StoreService
	) {}

	aChart;
	storeDisconnect;

	ngOnInit() {
		this.storeDisconnect = this.storeService.connect([
			{
				selector: getActiveChartId(),
				subscriber: aChart => {
					this.aChart = aChart;
				}
			}
		]);
	}

	ngOnDestroy(): void {
		this.storeDisconnect.unsubscribe();
	}

	remove() {
		this.storeService.dispatch(new RemovePageProject({chartId: this.aChart}));
	}
}
