import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';
import { ProjectDomain } from '@app/models/project-domain.model';
import { OriginProject } from '@app/models/project.model';
import { ResponseScheme } from '@app/models/response-scheme.model';

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

	getPartByUserId(): Observable<ResponseScheme<any[]>> {
		return this.httpService.makeRequest<ResponseScheme<any[]>>(
			new ServiceRequest(RequestType.GET, `${this.projectPath}/owners`)
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

	update(payload: {
		project: OriginProject;
	}): Observable<ResponseScheme<OriginProject>> {
		const s = this.httpService.makeRequest<ResponseScheme<OriginProject>>(
			new ServiceRequest(
				RequestType.PUT,
				`/${this.projectPath}/${payload.project.id}`,
				null,
				payload.project
			)
		);
		return s;
	}

	delete(payload: {
		projectId: number;
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
