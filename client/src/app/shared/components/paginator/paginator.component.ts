import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {
	@Input()
	totalRecords: number;
	@Input()
	page = 1;
	@Input()
	rows = 10;

	@Input()
	pagination: any;

	@Output()
	onpagination = new EventEmitter<number>();

	ngOnInit() {
	}

	paginate(event) {
		this.onpagination.emit(event.page + 1);
	}
}
