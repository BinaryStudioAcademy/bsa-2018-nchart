import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
// import { Project, ResponseScheme } from '@app/models';
import { normalize } from 'normalizr';
import { arrayOfCustomData } from '@app/schemes/custom.schema';
import { ProjectsActionConstants } from '@app/store/actions/projects/projects.action-types';
import * as projectActions from '@app/store/actions/projects/projects.actions';
// import { Observable, throwError } from 'rxjs/index';
import { throwError } from 'rxjs/index';
import { ProjectDomainService } from '@app/api/domains/project';

@Injectable()
export class ProjectsEffects {
	constructor(
		private action$: Actions,
		private projectDomainService: ProjectDomainService
	) {}

	@Effect()
	loadData$ = this.action$.pipe(
		ofType(ProjectsActionConstants.LOAD_PROJECTS),
		switchMap((action: projectActions.LoadProjetcs) =>
			this.projectDomainService.getAll().pipe(
				map(value => {
					if (value.isSuccess) {
						const {
							result: all,
							entities: { byId }
						} = normalize(value.payload, arrayOfCustomData);
						return new projectActions.LoadProjectsComplete({
							projects: {
								all,
								byId
							}
						});
					}
					return throwError(new Error('Cant get projects'));
				}),
				catchError(error => {
					return of(
						new projectActions.LoadProjectsFailed({
							action: action,
							msg: 'test',
							error: null
						})
					);
				})
			)
		)
	);

	// @Effect()
	// createDraftProject$ = this.action$.pipe(
	// 	ofType(ProjectsActionConstants.CREATE_DRAFT_PROJECT),
	// 	switchMap((action: projectActions.CreateDraftProject) =>
	// 		this.projectDomainService.save(action.payload).pipe(
	// 			map(payload => {
	// 				if(payload.isSuccess){
	// 					return new projectActions.CreateDraftProjectComplete(payload);
	// 				}
	// 				return throwError(new Error('Can\'t post project'));
	// 			}),
	// 			catchError(error =>
	// 				of(new projectActions.CreateDraftProjectFailed())
	// 			)
	// 		)
	// 	)
	// );

	@Effect()
	loadOneProject$ = this.action$.pipe(
		ofType(ProjectsActionConstants.LOAD_ONE_PROJECT),
		switchMap((action: projectActions.LoadOneProject) =>
			this.projectDomainService.get(action.payload).pipe(
				map(payload => {
					if (payload.isSuccess) {
						return new projectActions.LoadOneProjectComplete(
							payload.payload
						);
					}
					return throwError(new Error(`Can't get one project`));
				}),
				catchError(error =>
					of(new projectActions.LoadOneProjectFailed())
				)
			)
		)
	);
}
