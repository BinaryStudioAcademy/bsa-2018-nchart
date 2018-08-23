import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit {
	constructor(element: ElementRef) {}

	ngOnInit() {}
}
