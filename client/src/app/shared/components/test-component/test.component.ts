import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../models';
import { projects as projectsSelector } from '@app/store/selectors/projects.selectors.ts';
import { StoreService } from '@app/services/store.service';
import * as projectActions from '@app/store/actions/projects/projects.actions';
// import { Store } from '@ngrx/store';
// import { AppState } from '@app/models';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	animations: []
})
export class TestComponent implements OnInit, OnDestroy {
	projects: Array<Project>;
	disconnect;

	// private store: Store<AppState>
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

	// dispatchSave() {
	// 	this.storeService.dispatch(new projectActions.CreateDraftProject( {project: this.prj}));
	// }

	dispatchLoadOne() {
		this.storeService.dispatch(
			new projectActions.LoadOneProject({ projectId: '1' })
		);
	}

	ngOnDestroy() {
		this.disconnect();
	}

	// prj: Project = {
	// 	id: '1',
	// 	name: 'bar chart',
	// 	datasets: [1, 2],
	// 	charts: [1, 2],
	// 	createdAt: 1,
	// 	isDraft: true
	// };
}
