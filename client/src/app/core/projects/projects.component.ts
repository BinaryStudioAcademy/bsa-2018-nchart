import {Component, OnDestroy, OnInit} from '@angular/core';
import {projects as projectsSelector} from '@app/store/selectors/projects.selectors.ts';
import {StoreService} from '@app/services/store.service';
import * as fromProjects from '@app/store/actions/projects/projects.actions';
import {Project} from '@app/models';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit, OnDestroy {
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

	dispatch() {
		this.storeService.dispatch(new fromProjects.LoadProjetcsInfo({userId: '1'}));
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
