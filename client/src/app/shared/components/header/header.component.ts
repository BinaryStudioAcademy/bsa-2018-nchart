import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StoreService } from '@app/services/store.service';
import { project } from '@app/store/selectors/projects.selectors';
import { user } from '@app/store/selectors/user.selectors';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
	@Input()
	isAuthorized = false;
	getName: () => void;

	items: MenuItem[];
	authItems: MenuItem[];
	profileItems: MenuItem[];

	userName: string;
	userImage = 'fas fa-user-tie';

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.items = [
			{
				label: null,
				routerLink: ['/app/projects/draft']
			}
		];
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

		this.storeService.connect([
			{
				subscriber: prj => {
					if (prj) {
						this.items[0].label = prj.name;
					}
				},
				selector: project()
			},
			{
				subscriber: usr => {
					this.userName = usr.name || 'Username';
					if (usr.id) {
						this.isAuthorized = !!usr.id;
					}
				},
				selector: user()
			}
		]);
	}

	onClick() {
		/*this.isAuthorized = !this.isAuthorized;
		this.isAuthorized
			? this.items.push(...this.authItems)
			: this.items.splice(1);*/
	}
}
