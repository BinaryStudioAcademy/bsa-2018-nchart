import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
	@Input()
	projectName = 'Project name';
	@Input()
	isAuthorized = false;

	items: MenuItem[];
	authItems: MenuItem[];
	userButtons;

	ngOnInit() {
		this.authItems = [
			{ label: 'Projects', routerLink: ['/app/projects'] },
			{ label: 'Companies', routerLink: ['/app/companies'] }
		];
		this.items = [
			{
				label: this.projectName,
				routerLink: ['/app/projects/id'],
				style: { 'margin-right': '100px', color: 'red' }
			}
		];
		this.userButtons = [
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
		this.isAuthorized = !this.isAuthorized;
		this.isAuthorized
			? this.items.push(...this.authItems)
			: this.items.splice(1);
	}

	getButtonClasses() {
		return {
			'header-button': true
		};
	}
	getUserButtonClasses() {
		return {
			'header-button': true,
			'header-user-button': true
		};
	}
}
