import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { TabPanelComponent } from '../tab-panel/tab-panel.component';

@Component({
	selector: 'app-tab-view',
	templateUrl: './tab-view.component.html'
})
export class TabViewComponent implements OnInit {
	tabs: TabPanelComponent['tabs'];

	@ContentChild(TabPanelComponent)
	input: TabPanelComponent;

	constructor() {}

	ngOnInit() {}

}
