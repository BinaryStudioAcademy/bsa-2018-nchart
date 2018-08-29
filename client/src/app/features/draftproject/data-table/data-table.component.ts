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
		label: 'New column',
		icon: 'fa fa-plus',
		command: () => {
			this.addNewColumn();
		}
	}, {
		label: 'To number',
		command: () => {
			this.changeColumnType('number');
		}
	}, {
		label: 'To string',
		command: () => {
			this.changeColumnType('string');
		}
	}, {
		label: 'To boolean',
		command: () => {
			this.changeColumnType('boolean');
		}
	}, {
		label: 'Delete column',
		icon: 'fa fa-trash',
		command: () => {
			this.removeColumn();
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

	changeColumnType(type) {
		const col = this.headerId;
		this.storeService.dispatch(
			new DatasetActions.ChangeColumnType({
				id: this.columnsId[col],
				type: type
			})
		);
		this.data.map((el, i) => {
			const value = this.convertDataType(type, el[col]);
			this.change({ value, i, col });
		});
	}

	convertDataType(type, value) {
		switch (type) {
			case 'string':
				value += '';
				break;
			case 'number':
				value = +value ? +value : 0;
				break;
			case 'boolean':
				value = !!value;
				break;
		}
		return value;
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
		// if (this.columns[col].type !== typeof(value)) {
		// 	return;
		// }
		// switch (this.columns[col].type) {
		// 	case 'string':
		// 		value += '';
		// 		break;
		// 	case 'number':
		// 		value = +value ? +value : 0;
		// 		break;
		// 	case 'boolean':
		// 		value = !!value;
		// 		break;
		// }
		value = this.convertDataType(this.columns[col].type, value);
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
