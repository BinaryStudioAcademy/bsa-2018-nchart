import { Component, OnDestroy, OnInit } from '@angular/core';
import { projects as projectsSelector } from '@app/store/selectors/projects.selectors.ts';
import { StoreService } from '@app/services/store.service';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit, OnDestroy {
	projects$: Observable<any>;
	disconnect;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.projects$ = this.storeService.createSubscription(
			projectsSelector()
		);
		this.storeService.dispatch(new projectActions.LoadProjetcsInfo());
	}

	getProjects() {
		return this.projects$;
	}

	ngOnDestroy() {
		this.disconnect();
	}
}
