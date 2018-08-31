import { Component, OnInit, ElementRef } from '@angular/core';
import {StoreService} from '@app/services/store.service';
import {RemoveChart} from '@app/store/actions/charts/charts.actions';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit {
	constructor(
		element: ElementRef,
		private storeService: StoreService
	) {}

	ngOnInit() {}

	remove() {
		this.storeService.dispatch(new RemoveChart());
	}
}
