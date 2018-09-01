import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	ChangeDetectionStrategy,
	ViewChildren,
	OnChanges
} from '@angular/core';
import { DatasetColumn } from '@app/models/dataset.model';
import { SchemeID } from '@app/models/normalizr.model';
import { MenuItem } from 'primeng/api';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {
	constructor() {}
	@Input()
	columns: DatasetColumn[] = [];
	@Input()
	data: any[][] = [[]];
	@Input()
	headerItems: (index: number) => MenuItem[];
	@Input()
	rowItems: (columnId: SchemeID, index: number) => MenuItem[];
	@Input()
	headerRowItems: () => MenuItem[];
	@Output()
	cellChange = new EventEmitter();
	@Output()
	headerChange = new EventEmitter();
	@Output()
	getSelectedRows = new EventEmitter();
	@Input()
	selectedRows = [];
	@Input()
	checkedAll;
	isCheckedAll = false;
	checkControl = new FormControl(this.checkedAll || false);
	control = new FormControl(this.checkedAll || false);
	@ViewChildren('checkbox')
	checkboxes;

	getSelectedCheckboxes() {
		let res = 0;
		this.checkboxes.toArray().map(el => {
			return el.control.value ? res++ : res;
		});
		return res;
	}

	ngOnInit() {}

	ngOnChanges() {
		this.checkControl.setValue(false);
		this.control.setValue(false);
	}

	getRows(val, i) {
		if (val) {
			this.selectedRows.push(i);
		} else {
			this.isCheckedAll = false;
			this.control.setValue(false);
			this.selectedRows.splice(this.selectedRows.indexOf(i), 1);
		}
		if (this.selectedRows.length === this.getSelectedCheckboxes()) {
			this.control.setValue(true);
			this.isCheckedAll = true;
		}
		this.getSelectedRows.emit(this.selectedRows);
	}

	checkAll() {
		this.isCheckedAll = !this.isCheckedAll;
		if (this.isCheckedAll) {
			this.selectedRows = this.data.map((e, i) => i);
			this.checkControl.setValue(true);
		} else {
			this.selectedRows = [];
			this.checkControl.setValue(false);
		}
	}

	isNewValue(oldValue, newValue) {
		return oldValue !== newValue;
	}

	onBlur(e, i, col) {
		const { value } = e.target;
		if (this.isNewValue(this.data[i][col], value)) {
			this.cellChange.emit({
				value,
				i,
				col
			});
		}
	}

	onKeyDown(e, i, col) {
		const { value } = e.target;
		if (e.keyCode === 13 && this.isNewValue(this.data[i][col], value)) {
			this.cellChange.emit({
				value,
				i,
				col
			});
		}
	}

	onHeaderKeyDown(e, i) {
		const title = e.target.value;
		if (e.keyCode === 13 && this.isNewValue(this.columns[i], title)) {
			this.headerChange.emit({
				title,
				i
			});
		}
	}

	onHeaderBlurDown(e, i) {
		const title = e.target.value;
		if (this.isNewValue(this.data[i], title)) {
			this.headerChange.emit({
				title,
				i
			});
		}
	}
}
