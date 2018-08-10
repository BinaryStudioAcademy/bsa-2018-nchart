import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Tabs {
	header: string;
	content?: any;
	closable?: boolean;
	disabled?: boolean;
	leftIcon?: string;
	rightIcon?: string;
}

@Component({
	selector: 'app-checkbox-group',
	templateUrl: './tabs-group.component.html'
})
export class TabsGroupComponent implements OnInit {
	@Input() tabs: Tabs[];
	@Input() selectedTab: number;
	@Output() change = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	onTabChange(event) {
		this.change.emit(event);
	}
}
