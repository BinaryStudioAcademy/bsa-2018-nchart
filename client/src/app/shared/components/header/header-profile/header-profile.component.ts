import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-header-profile',
	templateUrl: './header-profile.component.html'
})
export class HeaderProfileComponent implements OnInit {
	@Input()
	items: MenuItem[];
	@Input()
	image: string;
	@Input()
	label: string;

	ngOnInit() {}

	getClasses() {
		return {
			'header-profile': true
		};
	}
}
