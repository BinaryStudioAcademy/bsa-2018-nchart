import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	ChangeDetectionStrategy
} from '@angular/core';
import { DatasetColumn } from '@app/models/dataset.model';

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
	@Output()
	cellChange = new EventEmitter();

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
}
