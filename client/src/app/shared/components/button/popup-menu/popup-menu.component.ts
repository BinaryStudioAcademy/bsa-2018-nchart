import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-popup-menu',
	templateUrl: './popup-menu.component.html'
})
export class PopupMenuComponent implements OnInit {
	@Input()
	items: MenuItem[];
	@Input()
	label: string;

	ngOnInit() {}
}
