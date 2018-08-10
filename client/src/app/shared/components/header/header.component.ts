import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
	items: MenuItem[];

	ngOnInit() {
		this.items = [
			{ label: 'Stats' },
			{ label: 'Calendar' },
			{ label: 'Documentation' },
			{ label: 'Support' },
			{ label: 'Social' }
		];
	}
}
