import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StoreService } from '@app/services/store.service';
import {
	project,
	hasActiveProject,
	isHasNewPage,
	toRedirect
} from '@app/store/selectors/projects.selectors';
import { user } from '@app/store/selectors/user.selectors';
import { Logout } from '@app/store/actions/user/user.actions';
import { ShowDialog, SetButtonUrl} from '@app/store/actions/projects/projects.actions';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RedirectUrl, RedirectUrlProp } from '@app/models/redirect.model';

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
	redirectUrl : string;

	private disconnectStore = null;
	userName: string;
	userImage = 'fas fa-user-tie';
	isHasNewPage : boolean = false;

	constructor(private storeService: StoreService,private router: Router) {}

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
			},
			{
				subscriber: res => {
					this.isHasNewPage = res
				},
				selector: isHasNewPage()
			}
		]);
	}

	redirectTo(url,param){

		RedirectUrlProp.queryParams = param;
		RedirectUrlProp.url = url

		this.storeService.dispatch(new SetButtonUrl({redirectUrl : RedirectUrlProp}))
		if(this.isHasNewPage)
		{
			this.storeService.dispatch(new ShowDialog());
		}
		else
		{
			this.router.navigate([url],param);
		}
	}

	logout() {
		this.storeService.dispatch(new Logout());
	}

	ngOnDestroy(): void {
		this.disconnectStore();
	}
}
