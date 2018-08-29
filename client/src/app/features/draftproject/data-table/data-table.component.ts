import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DatasetColumn } from '@app/models/dataset.model';
import { StoreService } from '@app/services/store.service';
import {
	getDatasetValues,
	getDatasetHeaders
} from '@app/store/selectors/dataset.selectors';
import * as DatasetActions from '@app/store/actions/datasets/datasets.actions';
import { SchemeID } from '@app/models/normalizr.model';
import { activeDatasetId } from '@app/store/selectors/dataset.selectors';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit, OnDestroy {
	disconnect: () => void;
	columns: DatasetColumn[];
	datasetId: SchemeID;
	data: any[][];
	dataId: SchemeID[][];
	headerId: number;
	rowId: number;
	rowItems = [
		{
			label: 'Delete row',
			icon: 'fa fa-trash',
			command: () => {
				this.removeRow();
			}
		}
	];

	headerItems = (columnId, index) => {
		return [
			{
				label: 'New column',
				icon: 'fa fa-plus',
				command: () => {
					this.addNewColumn();
				}
			},
			{
				label: 'To number',
				command: () => {
					this.changeColumnType('number');
				}
			},
			{
				label: 'To string',
				command: () => {
					this.changeColumnType('string');
				}
			},
			{
				label: 'To boolean',
				command: () => {
					this.changeColumnType('boolean');
				}
			},
			{
				label: 'Delete column',
				icon: 'fa fa-trash',
				command: () => {
					this.removeColumn(this.datasetId, columnId, index);
				}
			}
		];
	// tslint:disable-next-line:semicolon
	};

	removeColumn(datasetId, columnId, index) {
		this.storeService.dispatch(
			new DatasetActions.DeleteColumn({
				id: columnId,
				datasetId,
				index
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

	addNewColumn() {}

	changeColumnType(type) {
		/* const col = this.headerId;
		this.storeService.dispatch(
			new DatasetActions.ChangeColumnType({
				id: this.columnsId[col],
				type: type
			})
		);
		this.data.map((el, i) => {
			const value = this.convertDataType(type, el[col]);
			this.change({ value, i, col });
		}); */
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
				subscriber: (dataHeaders: DatasetColumn[]) => {
					this.columns = dataHeaders;
				},
				selector: getDatasetHeaders()
			},
			{
				subscriber: data => {
					this.data = data.values;
					this.dataId = data.ids;
				},
				selector: getDatasetValues()
			},
			{
				subscriber: id => {
					this.datasetId = id;
				},
				selector: activeDatasetId()
			}
		]);
	}

	change({ value, i, col }) {
		value = this.convertDataType(this.columns[col].type, value);
		this.storeService.dispatch(
			new DatasetActions.ChangeContent({
				id: this.dataId[i][col],
				value: value
			})
		);
	}

	headerChange({ title, i }) {
		/* this.storeService.dispatch(
			new DatasetActions.ChangeHeaderTitle({
				id: this.columnsId[i],
				title: title
			})
		); */
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
