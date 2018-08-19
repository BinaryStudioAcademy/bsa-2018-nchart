import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnChanges {
	@Input()
	projectName: string;
	@Input()
	isAuthorized = false;

	items: MenuItem[];
	authItems: MenuItem[];
	profileItems: MenuItem[];

	constructor() {}

	ngOnChanges() {
		if (this.projectName) {
			this.items[0].label = this.projectName;
		}
	}

	ngOnInit() {
		this.items = [{
				label: this.projectName || '',
				routerLink: ['/app/projects/draft']
		}];
		this.authItems = [
			{ label: 'Projects', routerLink: ['/app/projects'] },
			{ label: 'Companies', routerLink: ['/app/companies'] }
		];
		this.profileItems = [
			{
				label: 'Sign out',
				routerLink: ['/'],
				command: () => {
					this.onClick();
				}
			}
		];
	}

	onClick() {
		/*this.isAuthorized = !this.isAuthorized;
		this.isAuthorized
			? this.items.push(...this.authItems)
			: this.items.splice(1);*/
	}
}
