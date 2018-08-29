import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DatasetColumn } from '@app/models/dataset.model';
import { StoreService } from '@app/services/store.service';
import { getDatasetValues, getDatasetHeaders } from '@app/store/selectors/dataset.selectors';
import * as DatasetActions from '@app/store/actions/datasets/datasets.actions';
import { SchemeID } from '@app/models/normalizr.model';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit, OnDestroy {
	disconnect: () => void;
	columns: DatasetColumn[];
	data: any[][];
	dataId: SchemeID[][];
	columnsId: SchemeID[];
	headerId: number;
	rowId: number;
	headerItems = [{
		label: 'Delete column',
		icon: 'fa fa-trash',
		command: () => {
			this.removeColumn();
		}
	}, {
		label: 'New column',
		icon: 'fa fa-plus',
		command: () => {
			this.addNewColumn();
		}
	}, {
		label: 'To number',
		command: () => {
			this.columnToNumber();
		}
	}, {
		label: 'To string',
		command: () => {
			this.columnToString();
		}
	}, {
		label: 'To boolean',
		command: () => {
			this.columnToBoolean();
		}
	}];
	rowItems = [{
		label: 'Delete row',
		icon: 'fa fa-trash',
		command: () => {
			this.removeRow();
		}
	}];

	removeColumn() {
		this.storeService.dispatch(
			new DatasetActions.DeleteColumn({
				id: this.columnsId[this.headerId]
			})
		);
	}

	removeRow() {
		const data = this.dataId[this.rowId];
		data.map((d, i) => {
			this.storeService.dispatch(
				new DatasetActions.DeleteRow({
					id: this.dataId[this.rowId][i]
				})
			);
		});
	}

	addNewColumn() {

	}

	columnToNumber() {
		const col = this.headerId;
		this.data.map((el, i) => {
			const value = +el[col];
			if (!!value) {
				this.change({ value, i, col });
			}
		});
	}

	columnToString() {
		const col = this.headerId;
		this.data.map((el, i) => {
			const value = String(el[col]);
			this.change({ value, i, col });
		});
	}

	columnToBoolean() {
		const col = this.headerId;
		this.data.map((el, i) => {
			const value = !!el[col];
			this.change({ value, i, col });
		});
	}

	getHeaderId(id) {
		this.headerId = id;
	}

	getRowId(id) {
		this.rowId = id;
	}

	constructor(element: ElementRef, private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: dataHeaders => {
					this.columns = dataHeaders.values;
					this.columnsId = dataHeaders.ids;
				},
				selector: getDatasetHeaders()
			},
			{
				subscriber: data => {
					this.data = data.values;
					this.dataId = data.ids;
				},
				selector: getDatasetValues()
			}
		]);
	}

	change({ value, i, col }) {
		// switch (typeof(this.data[i][col])) {
		// 	case 'number':
		// 		value = +value;
		// 		break;
		// 	case 'string':
		// 		value += '';
		// 		break;
		// 	case 'boolean':
		// 		value = !!value;
		// 		break;
		// }
		this.storeService.dispatch(
			new DatasetActions.ChangeContent({
				id: this.dataId[i][col],
				value: value
			})
		);
	}

	headerChange({ title, i}) {
		this.storeService.dispatch(
			new DatasetActions.ChangeHeaderTitle({
				id: this.columnsId[i],
				title: title
			})
		);
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
