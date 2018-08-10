import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Project } from '@app/models';
import { normalize } from 'normalizr';
import { arrayOfCustomData } from '@app/models/custom.schema';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import {
	LoadDataComplete,
	LoadDataFailed
} from '@app/store/actions/projects/projects.actions';
import { Observable } from 'rxjs/index';

@Injectable()
export class ProjectsEffects {
	api = {
		loadProjects: (): Observable<Array<Project>> => {
			return of([
				{
					id: 'q1',
					name: 'proj binary',
					created_at: '12345678'
				},
				{
					id: 'q2',
					name: 'proj macpaw',
					created_at: '995678'
				},
				{
					id: 'q3',
					name: 'proj kpi',
					created_at: '1'
				}
			]);
		}
	};

	constructor(private action$: Actions) {}

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
