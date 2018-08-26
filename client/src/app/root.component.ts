import {Component, OnDestroy, OnInit} from '@angular/core';
import {projects as projectsSelector} from '@app/store/selectors/projects.selectors.ts';
import {StoreService} from '@app/services/store.service';
import * as fromProjects from '@app/store/actions/projects/projects.actions';
import {Project} from './models/project.model';

@Component({
	selector: 'app-root',
	templateUrl: './root.component.html',
	styleUrls: ['./root.component.sass']
})
export class RootComponent implements OnInit, OnDestroy {
	projects: Array<Project>;
	disconnect;

	constructor(private storeService: StoreService) {
	}

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

	loadOne() {
		this.storeService.dispatch(new fromProjects.LoadOneProject({projectId: '1'}));
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
