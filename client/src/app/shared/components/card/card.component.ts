import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	animations: []
})
export class CardComponent implements OnInit {
	display = false;
	itemsObjs = [
		{
			label: 'Rename'
			// icon: 'fa fa-plus'
		},
		{
			label: 'Delete'
			// icon: 'fa fa-plus'
		},
		{
			label: 'Share',
			// icon: 'fa fa-plus',
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

	ngOnInit() {}

	shareDialog() {
		this.display = true;
	}
}
