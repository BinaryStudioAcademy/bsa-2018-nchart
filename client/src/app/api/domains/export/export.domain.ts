import { Observable } from 'rxjs';
import { ExportDomain } from '@app/models/export-domain.model';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';
import { ExportType, ProjectExportPayload } from '@app/models/export.model';
import { SchemeID } from '@app/models/normalizr.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ExportDomainService implements ExportDomain {
	private projectPath = '/api/project';
	constructor(private httpService: HttpService) {}

	exportProject(payload: {
		id: SchemeID;
		type: ExportType;
		filename: string;
	}): Observable<{
		filename: string;
		data: Blob;
	}> {
		return this.httpService
			.makeFileRequest(
				new ServiceRequest(
					RequestType.GET,
					`${this.projectPath}/${payload.id}/export`,
					null,
					{ type: payload.type }
				)
			)
			.pipe(
				map(res => {
					return {
						filename: `${payload.filename}.${payload.type}`,
						data: res
					};
				})
			);
	}

	exportProjectSvg(
		payload: ProjectExportPayload
	): Observable<{
		filename: string;
		data: Blob;
	}> {
		return this.httpService
			.makeFileRequest(
				new ServiceRequest(
					RequestType.POST,
					`${this.projectPath}/${payload.id}/export`,
					null,
					{
						type: payload.type,
						content: payload.svg
					}
				)
			)
			.pipe(
				map(res => {
					return {
						filename: `${payload.filename}.${payload.type}`,
						data: res
					};
				})
			);
	}

	exportDashboard(
		payload: ProjectExportPayload
	): Observable<{
		filename: string;
		data: Blob;
	}> {
		return this.httpService
			.makeFileRequest(
				new ServiceRequest(
					RequestType.POST,
					`${this.projectPath}/${payload.id}/export-dashboard`,
					null,
					{
						type: payload.type,
						content: payload.dashboard,
						landscape : payload.landscape
					}
				)
			)
			.pipe(
				map(res => {
					return {
						filename: `${payload.filename}.${payload.type}`,
						data: res
					};
				})
			);
	}
}
