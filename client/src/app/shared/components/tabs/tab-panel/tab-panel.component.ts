import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TabViewComponent } from '../tab-view/tab-view.component';

interface Tabs {
	header: string;
	content?: any;
	closable?: boolean;
	disabled?: boolean;
	leftIcon?: string;
	rightIcon?: string;
}

@Component({
	selector: 'app-tab-panel',
	templateUrl: './tab-panel.component.html'
})
export class TabPanelComponent implements OnInit {
	@Input() tabs: Tabs[];
	@Input() selectedTab: number;
	@Output() change = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	onTabChange(event) {
		this.change.emit(event);
	}
}
