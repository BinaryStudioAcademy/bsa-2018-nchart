import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	animations: []
})
export class CardComponent implements OnInit {
	display = false;
	displayDelete = false;
	date: string;
	status: string;
	itemsObjs = [
		{
			label: 'Rename'
			// icon: 'fa fa-plus'
		},
		{
			label: 'Delete',
			command: () => {
				this.deleteDialog();
			}
		},
		{
			label: 'Share',
			command: () => {
				this.shareDialog();
			}
		}
	];

	constructor() {}

	@Input()
	companyName: string;

	@Input()
	groupName: string;

	@Input()
	projectId: number;

	@Input()
	projectName: string;

	@Input()
	userName: string;

	@Input()
	email: string;

	@Input()
	accessLevelId: number;

	@Input()
	userCharts: String[];

	@Input()
	updatedAt: Date;

	ngOnInit() {
		if (this.accessLevelId === 1) {
			this.status = 'Admin';
		}
		if (this.accessLevelId === 2) {
			this.status = 'Read/Write';
		}
		if (this.accessLevelId === 3) {
			this.status = 'Read';
		}
		// format data
		this.date = moment(this.updatedAt).format('MM/DD/YYYY HH:MM');
	}

	deleteDialog() {
		this.displayDelete = true;
	}

	shareDialog() {
		if (this.accessLevelId === 3) {
			return;
		}
		this.display = true;
	}
}
