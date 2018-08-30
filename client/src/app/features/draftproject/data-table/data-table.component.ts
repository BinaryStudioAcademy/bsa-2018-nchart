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
import { v4 } from 'uuid';
import { MenuItem } from 'primeng/api';

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
	rowItems = (index): MenuItem[] => {
		return [
			{
				label: 'New row',
				icon: 'fa fa-plus',
				command: () => {
					this.addNewRow();
				}
			}, {
				label: 'Delete row',
				icon: 'fa fa-trash',
				command: () => {
					this.removeRow(index);
				}
			}
		];
	}

	headerRowItems = (): MenuItem[] => {
		return [{
				label: 'New row',
				icon: 'fa fa-plus',
				url: '#/draft/project',
				command: () => {
					this.addNewRow();
				}
			}
		];
	}

	headerItems = (columnId, index) => {
		return [
			{
				label: 'New column',
				icon: 'fa fa-plus',
				url: '#/draft/project',
				command: () => {
					this.addNewColumn();
				}
			}, {
				label: 'To number',
				url: '#/draft/project',
				command: () => {
					this.changeColumnType('number', index, columnId);
				}
			},
			{
				label: 'To string',
				url: '#/draft/project',
				command: () => {
					this.changeColumnType('string', index, columnId);
				}
			},
			{
				label: 'To boolean',
				url: '#/draft/project',
				command: () => {
					this.changeColumnType('boolean', index, columnId);
				}
			},
			{
				label: 'Delete column',
				icon: 'fa fa-trash',
				url: '#/draft/project',
				command: () => {
					this.removeColumn(columnId, index);
				}
			}
		];
	}

	removeColumn(columnId, index) {
		this.storeService.dispatch(
			new DatasetActions.DeleteColumn({
				id: columnId,
				datasetId: this.datasetId,
				index
			})
		);
	}

	removeRow(index) {
		this.storeService.dispatch(
			new DatasetActions.DeleteRow({
				rows: this.data.length - 1,
				datasetId: this.datasetId,
				index: index
			})
		);
	}

	addNewColumn() {
		this.storeService.dispatch(
			new DatasetActions.AddNewColumn({
				id: v4(),
				title: 'Header',
				type: 'string',
				datasetId: this.datasetId,
				index: this.columns.length,
				rows: this.data.length
			})
		);
	}

	addNewRow() {
		this.storeService.dispatch(
			new DatasetActions.AddNewRow({
				datasetId: this.datasetId,
				index: this.columns.length,
				rows: this.data.length
			})
		);
	}

	changeColumnType(type, col, columnId) {
		this.storeService.dispatch(
			new DatasetActions.ChangeColumnType({
				datasetId: this.datasetId,
				columnId: columnId,
				type: type,
				data: this.getDataByCol(col, type),
				index: col
			})
		);
	}

	getDataByCol(col, type) {
		const result = [];
		this.data.filter(dataArr => dataArr.map((data) => {
			if (data.id.includes(`-${col}-`)) {
				data.value = this.convertDataType(type, data.value);
				result.push(data);
			}
		}));
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
