import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../models';
import { projects as projectsSelector } from '@app/store/selectors/projects.selectors.ts';
import { StoreService } from '@app/services/store.service';
import * as projectActions from '@app/store/actions/projects/projects.actions';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	animations: []
})
export class TestComponent implements OnInit, OnDestroy {
	projects: Array<Project>;
	disconnect;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				subscriber: projects => {
					this.projects = projects;
				},
				selector: projectsSelector
			}
		]);
	}

	dispatchGetAllPj() {
		this.storeService.dispatch(new projectActions.LoadProjetcs());
	}

	dispatchGetOnePj() {}

	ngOnDestroy() {
		this.disconnect();
	}
}
