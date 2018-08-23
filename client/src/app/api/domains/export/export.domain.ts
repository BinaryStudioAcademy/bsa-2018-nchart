import { Observable } from 'rxjs';
import { ExportDomain } from '@app/models/export-domain.model';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';
import { ExportType } from '@app/models/export.model';
import { SchemeID } from '@app/models/normalizr.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ExportDomainService implements ExportDomain {
	private projectPath = '/api/project';
	constructor(private httpService: HttpService) {}

	exportProject(payload: {
		id: SchemeID;
		type: ExportType;
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
						filename: `${payload.id}.${payload.type}`,
						data: res
					};
				})
			);
	}
}
