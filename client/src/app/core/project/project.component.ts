import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { LoadCharts } from '@app/store/actions/charts/charts.actions';
import { CreateDraftProject } from '@app/store/actions/projects/projects.actions';
import { isProjectDataset } from '@app/store/selectors/projects.selectors';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as ProjectsActions from '@app/store/actions/projects/projects.actions';
import { project } from '@app/store/selectors/projects.selectors';
import { SchemeID } from '@app/models/normalizr.model';


@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit, OnDestroy {
	showCharts = false;
	showTable = false;
	routeParams$: Subscription;

	projectName: string;
	projectId: any;

	getProjectId: () => void;
	disconnect: () => void;

	constructor(
		private storeService: StoreService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.routeParams$ = this.route.params.subscribe(
			(params: { id?: number }) => {
				const { id } = params;

				if (id) {
				} else {
					this.storeService.dispatch(new LoadCharts());
					this.storeService.dispatch(new CreateDraftProject());
				}
			}
		);

		this.getProjectId = this.storeService.connect([
			{
				subscriber: prj => {
					this.projectId = prj.id;
					this.projectName = prj.name;
				},
				selector: project()
			}
		]);


		this.disconnect = this.storeService.connect([
			{
				subscriber: isReady => {
					this.showTable = isReady;
				},
				selector: isProjectDataset()
			}
		]);
	}

	ngOnDestroy() {
		this.disconnect();
	}

	changeProjectName(name) {
		this.storeService.dispatch(new ProjectsActions.ChangeProjectName({
			id: this.projectId,
			name: name
		}));
	}
}
