import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StoreService } from '@app/services/store.service';
import {
	project,
	hasActiveProject
} from '@app/store/selectors/projects.selectors';
import { user } from '@app/store/selectors/user.selectors';
import { Logout } from '@app/store/actions/user/user.actions';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Input()
	isAuthorized = false;
	getName: () => void;

	items: MenuItem[];
	authItems: MenuItem[];
	profileItems: MenuItem[];

	private disconnectStore = null;
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
				command: () => {
					this.logout();
				}
			}
		];

		this.disconnectStore = this.storeService.connect([
			{
				subscriber: prj => {
					if (prj) {
						this.items = [
							{
								label: prj.name,
								routerLink: ['/app/projects/draft']
							}
						];
					}
				},
				selector: project()
			},
			{
				subscriber: hasActive => {
					if (!hasActive) {
						this.items = [];
					}
				},
				selector: hasActiveProject()
			},
			{
				subscriber: usr => {
					this.userName = usr.name || 'Username';
					this.isAuthorized = !!usr.id;
				},
				selector: user()
			}
		]);
	}

	logout() {
		this.storeService.dispatch(new Logout());
	}

	ngOnDestroy(): void {
		this.disconnectStore();
	}
}
