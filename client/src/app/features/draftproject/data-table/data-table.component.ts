import { Component, OnInit, ElementRef } from '@angular/core';
import { DatasetColumn } from '@app/models/dataset.model';
import { StoreService } from '@app/services/store.service';
import { chartDataset } from '@app/store/selectors/dataset.selectors';
import * as DatasetActions from '@app/store/actions/datasets/datasets.actions';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit {
	disconnect: () => void;
	columns = [];
	data = [];
	dataId;

	constructor(element: ElementRef, private storeService: StoreService) {}

	// columns: DatasetColumn[] = [
	// 	{
	// 		id: 1,
	// 		title: 'col 1',
	// 		type: 'number'
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'col 2',
	// 		type: 'number'
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'col 3',
	// 		type: 'number'
	// 	},
	// 	{
	// 		id: 4,
	// 		title: 'col 4',
	// 		type: 'number'
	// 	},
	// 	{
	// 		id: 5,
	// 		title: 'col 5',
	// 		type: 'number'
	// 	},
	// 	{
	// 		id: 6,
	// 		title: 'col 6',
	// 		type: 'number'
	// 	}
	// ];

	// data: any[][] = [
	// 	[1, 2, 3, 4, 5, 6],
	// 	[21, 22, 23, 24, 25, 236],
	// 	[31, 32, 33, 34, 35, 36],
	// 	[41, 42, 43, 44, 45, 46],
	// 	[51, 52, 53, 54, 55, 56],
	// 	[1, 2, 3, 4, 5, 6],
	// 	[1, 2, 3, 4, 5, 6],
	// 	[1, 2, 3, 4, 5, 6],
	// 	[21, 22, 23, 24, 25, 236],
	// 	[31, 32, 33, 34, 35, 36],
	// 	[41, 42, 43, 44, 45, 46],
	// 	[51, 52, 53, 54, 55, 56]
	// ];

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: dataset => {
					if (dataset) {
						this.columns = dataset.source.columns;
						this.data = dataset.source.data;
						this.dataId = dataset.modified.data;
					}
				},
				selector: chartDataset()
			}
		]);
	}

	change({ value, i, col }) {
		this.data[i][col] = value;
		this.data = [...this.data];
		this.storeService.dispatch(
			new DatasetActions.ChangeContent({
				id: this.dataId[i][col],
				value: value
			})
		);
	}
}
