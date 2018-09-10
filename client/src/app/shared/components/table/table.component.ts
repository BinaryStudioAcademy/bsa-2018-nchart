import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	ChangeDetectionStrategy,
	OnChanges
} from '@angular/core';
import { DatasetColumn } from '@app/models/dataset.model';
import { SchemeID } from '@app/models/normalizr.model';
import { MenuItem } from 'primeng/api';

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
	@Input()
	tableHeight: string;

	ngOnInit() {}

	ngOnChanges() {}

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

	getRowId(dataCellId: string) {
		return dataCellId.split('-')[0];
	}
}
