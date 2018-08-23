import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ExportActionConstants } from '@app/store/actions/export/export.action-types';
import { ExportDomainService } from '@app/api/domains/export/export.domain';
import {
	ExportProject,
	ExportComplete,
	ExportFailed
} from '@app/store/actions/export/export.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ExportEffects {
	constructor(private action$: Actions, private api: ExportDomainService) {}

	@Effect()
	exportPdf$ = this.action$.pipe(
		ofType(ExportActionConstants.EXPORT_PROJECT),
		switchMap((action: ExportProject) =>
			this.api.exportProject(action.payload).pipe(
				map(res => {
					const url = window.URL.createObjectURL(res.data);
					const a = document.createElement('a');
					document.body.appendChild(a);
					a.setAttribute('style', 'display: none');
					a.href = url;
					a.download = res.filename;
					a.target = '_blank';
					a.click();
					window.URL.revokeObjectURL(url);
					a.remove();
					return new ExportComplete();
				}),
				catchError(error =>
					of(
						new ExportFailed({
							msg: `Can't export project`,
							action,
							error
						})
					)
				)
			)
		)
	);
}
