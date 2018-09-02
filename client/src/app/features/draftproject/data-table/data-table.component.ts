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
import { MenuItem } from 'primeng/api';
import { v4 } from 'uuid';

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
	rowIds: number[] = [];
	display = false;

	showDialog() {
		this.display = true;
	}
	rowItems = (rowId): MenuItem[] => {
		return [
			{
				label: 'New row',
				icon: 'fa fa-plus',
				command: () => {
					this.addNewRow();
				}
			},
			{
				label: 'Delete row',
				icon: 'fa fa-trash',
				command: () => {
					this.removeRow(rowId);
				}
			}
		];
		// tslint:disable-next-line:semicolon
	};

	headerRowItems = (): MenuItem[] => {
		return [
			{
				label: 'New row',
				icon: 'fa fa-plus',
				// url: '#/draft/project',
				command: () => {
					this.addNewRow();
				}
			},
			{
				label: 'New column',
				icon: 'fa fa-plus',
				// url: '#/draft/project',
				command: () => {
					this.addNewColumn();
				}
			}
		];
		// tslint:disable-next-line:semicolon
	};

	headerItems = columnId => {
		return [
			{
				label: 'New column',
				icon: 'fa fa-plus',
				// url: '#/draft/project',
				command: () => {
					this.addNewColumn();
				}
			},
			{
				label: 'To number',
				// url: '#/draft/project',
				command: () => {
					this.changeColumnType('number', columnId);
				}
			},
			{
				label: 'To string',
				// url: '#/draft/project',
				command: () => {
					this.changeColumnType('string', columnId);
				}
			},
			{
				label: 'To boolean',
				// url: '#/draft/project',
				command: () => {
					this.changeColumnType('boolean', columnId);
				}
			},
			{
				label: 'Delete column',
				icon: 'fa fa-trash',
				// url: '#/draft/project',
				command: () => {
					this.removeColumn(columnId);
				}
			}
		];
		// tslint:disable-next-line:semicolon
	};

	removeColumn(columnId) {
		this.storeService.dispatch(
			new DatasetActions.DeleteColumn({
				columnId: columnId,
				datasetId: this.datasetId
			})
		);
	}

	removeRow(rowId) {
		this.storeService.dispatch(
			new DatasetActions.DeleteRow({
				datasetId: this.datasetId,
				rowId: this.rowIds[rowId]
			})
		);
		this.rowIds = this.rowIds.filter(el => el !== this.rowIds[rowId]);
	}

	addNewColumn() {
		this.storeService.dispatch(
			new DatasetActions.AddNewColumn({
				datasetId: this.datasetId,
				dataLength: this.data.length,
				columnId: v4(),
				rowIds: this.rowIds
			})
		);
	}

	addNewRow() {
		this.rowIds.push(this.rowIds[this.rowIds.length - 1] + 1);
		this.storeService.dispatch(
			new DatasetActions.AddNewRow({
				datasetId: this.datasetId,
				dataLength: this.rowIds[this.rowIds.length - 1],
				columnIds: this.columns.map(col => col.id)
			})
		);
	}

	changeColumnType(type, columnId) {
		this.storeService.dispatch(
			new DatasetActions.ChangeColumnType({
				datasetId: this.datasetId,
				columnId: columnId,
				type,
				data: this.getDataByCol(type, columnId)
			})
		);
	}

	getDataByCol(type, columnId) {
		const result = [];
		this.data.filter(dataArr =>
			dataArr.map(data => {
				if (data.id.includes(`-${columnId}-`)) {
					data.value = this.convertDataType(type, data.value);
					result.push(data);
				}
			})
		);
		return result;
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
					this.data = data;
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
		this.rowIds = this.data.map((d, i) => i);
	}
	change({ value, i, col }) {
		value = this.convertDataType(this.columns[col].type, value);
		this.storeService.dispatch(
			new DatasetActions.ChangeContent({
				id: this.data[i][col].id,
				value: value
			})
		);
	}

	headerChange({ title, i }) {
		this.storeService.dispatch(
			new DatasetActions.ChangeHeaderTitle({
				id: this.columns[i].id,
				title: title
			})
		);
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
