import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
	selector: 'app-projects-card',
	templateUrl: './projects-card.component.html',
	animations: []
})
export class ProjectsCardComponent implements OnInit {
	display = false;
	displayDelete = false;
	displayRename = false;
	date: string;
	status: string;

	itemsObjs = [
		{
			label: 'Rename',
			command: () => {
				this.renameDialog();
			},
			icon: 'fa fa-edit'
		},
		{
			label: 'Share',
			command: () => {
				this.shareDialog();
			},
			icon: 'fa fa-share'
		},
		{
			label: 'Delete',
			command: () => {
				this.deleteDialog();
			},
			icon: 'fa fa-trash'
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
		this.date = moment(this.updatedAt).calendar(null, {
			sameDay: '[Today] [at] HH:MM',
			lastDay: '[Yesterday at] HH:MM',
			lastWeek: '[Last] dddd [at] HH:MM',
			sameElse: 'DD/MM/YYYY HH:MM'
		});
	}

	deleteDialog() {
		this.displayDelete = true;
	}

	renameDialog() {
		this.displayRename = true;
	}

	shareDialog() {
		if (this.accessLevelId === 3) {
			return;
		}
		this.display = true;
	}

	getCardTypeClasses(card) {
		return {
			'bar-chart-tag': 'Bar chart' === card,
			'pie-chart-tag': 'Pie Chart' === card,
			'scatterplot-tag': 'Scatter Plot' === card
		};
	}
}
