import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	ChangeDetectionStrategy
} from '@angular/core';
import { DatasetColumn } from '@app/models/dataset.model';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

	
	constructor() {}
	@Input()
	columns: DatasetColumn[] = [];
	@Input()
	data: any[][] = [[]];
	@Input()
	headerItems;
	@Input()
	rowItems;
	@Output()
	cellChange = new EventEmitter();
	@Output()
	headerChange = new EventEmitter();
	@Output()
	getHeaderId = new EventEmitter();
	@Output()
	getRowId = new EventEmitter();
	selectedRows;

	getColumnId(i) {
		this.getHeaderId.emit(i);
	}

	getDataRowId(i) {
		this.getRowId.emit(i);
	}

	checkboxChange(e) {
	}

	ngOnInit() {}

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
