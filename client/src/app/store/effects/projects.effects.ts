import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '@app/services/api.service';
import { Project } from '@app/models';
import { normalize } from 'normalizr';
import { arrayOfCustomData } from '@app/models/custom.schema';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import {
	LoadDataComplete,
	LoadDataFailed
} from '@app/store/actions/projects/projects.actions';

@Injectable()
export class ProjectsEffects {
	constructor(private api: ApiService, private action$: Actions) {}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(ProjectsActionConstants.PROJECTS_LOAD_DATA),
		switchMap((action: any) =>
			this.api.loadProjects().pipe(
				map((value: Array<Project>) => {
					const {
						result: all,
						entities: { byId }
					} = normalize(value, arrayOfCustomData);
					return new LoadDataComplete({
						projects: {
							all,
							byId
						}
					});
				}),
				catchError(error => {
					return of(
						new LoadDataFailed({
							action: action,
							msg: 'test',
							error: null
						})
					);
				})
			)
		)
	);
}
