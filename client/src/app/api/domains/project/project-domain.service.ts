import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';
import { ProjectDomain } from '@app/models/project-domain.model';
import { OriginProject } from '@app/models/project.model';
import { ResponseScheme } from '@app/models/response-scheme.model';
import { SchemeID } from '@app/models/normalizr.model';

@Injectable()
export class ProjectDomainService implements ProjectDomain {
	private projectPath = '/api/project';

	constructor(private httpService: HttpService) {}

	getAll(): Observable<ResponseScheme<OriginProject[]>> {
		return this.httpService.makeRequest<ResponseScheme<OriginProject[]>>(
			new ServiceRequest(RequestType.GET, `${this.projectPath}`, null)
		);
	}

	share(payload): Observable<ResponseScheme<any>> {
		return this.httpService.makeRequest<ResponseScheme<any>>(
			new ServiceRequest(
				RequestType.POST,
				`${this.projectPath}/shareByEmail`,
				{
					'Content-Type': 'application/json'
				},
				payload
			)
		);
	}

	getPartByUserId(payload): Observable<ResponseScheme<any>> {
		if (payload.name) {
			return this.httpService.makeRequest<ResponseScheme<any>>(
				new ServiceRequest(
					RequestType.GET,
					`${this.projectPath}/owners?page=${payload.page}&name=${
						payload.name
					}`
				)
			);
		}
		return this.httpService.makeRequest<ResponseScheme<any>>(
			new ServiceRequest(
				RequestType.GET,
				`${this.projectPath}/owners?page=${payload.page}`
			)
		);
	}

	save(payload): Observable<ResponseScheme<any>> {
		return this.httpService.makeRequest<ResponseScheme<any>>(
			new ServiceRequest(
				RequestType.POST,
				this.projectPath,
				{
					'Content-Type': 'application/json'
				},
				payload
			)
		);
	}

	updateName(payload: {
		id: SchemeID;
		name: string;
	}): Observable<ResponseScheme<any>> {
		return this.httpService.makeRequest<ResponseScheme<any>>(
			new ServiceRequest(
				RequestType.POST,
				`/${this.projectPath}/name`,
				null,
				payload
			)
		);
	}

	delete(payload: {
		projectId: SchemeID;
		accessLevelId: number;
	}): Observable<ResponseScheme<any>> {
		return this.httpService.makeRequest<ResponseScheme<any>>(
			new ServiceRequest(
				RequestType.POST,
				`${this.projectPath}/delete`,
				null,
				payload
			)
		);
	}

	getByProjectId(payload: {
		projectId: string;
	}): Observable<ResponseScheme<OriginProject>> {
		return this.httpService.makeRequest<ResponseScheme<OriginProject>>(
			new ServiceRequest(
				RequestType.GET,
				`${this.projectPath}/${payload.projectId}`
			)
		);
	}

	getByGroupId(payload: {
		groupId: string;
	}): Observable<ResponseScheme<OriginProject>> {
		return this.httpService.makeRequest<ResponseScheme<OriginProject>>(
			new ServiceRequest(
				RequestType.GET,
				`${this.projectPath}/group/${payload.groupId}`
			)
		);
	}
}
