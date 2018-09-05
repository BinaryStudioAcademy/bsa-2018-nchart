import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {

	@Input()
	totalRecords: number;

	ngOnInit() {
	}

	// paginate(event) {
	// 	console.log(event.first,event.rows,event.page,event.pageCount);
	// }
}
