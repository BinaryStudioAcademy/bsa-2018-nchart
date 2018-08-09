import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './models';
import { VerifyToken } from '@app/store/actions/user/user.actions';
import { user as userSelector } from '@app/store/selectors/user.selectors';
import { companies as companiesSelector } from '@app/store/selectors/companies.selectors.ts';
import { projects as projectsSelector } from '@app/store/selectors/projects.selectors.ts';
import { StoreService } from '@app/services/store.service';
import * as fromCompanies from '@app/store/actions/companies/companies.actions';
import * as fromProjects from '@app/store/actions/projects/projects.actions';
import { Company, Project } from '@app/models';

@Component({
	selector: 'app-root',
	templateUrl: './root.component.html',
	styleUrls: ['./root.component.sass']
})
export class RootComponent implements OnInit, OnDestroy {
	user: User;
	projects: Array<Project>;
	companies: Array<Company>;
	disconnect;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: user => {
					this.user = user;
				},
				selector: userSelector
			},
			{
				subscriber: companies => {
					this.companies = companies;
				},
				selector: companiesSelector
			},
			{
				subscriber: projects => {
					this.projects = projects;
				},
				selector: projectsSelector
			}
		]);
	}

	dispatch() {
		this.storeService.dispatch(new VerifyToken({ token: '12345' }));
	}

	dispatchC() {
		this.storeService.dispatch(new fromCompanies.LoadData());
	}

	dispatchD() {
		this.storeService.dispatch(new fromProjects.LoadData());
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
