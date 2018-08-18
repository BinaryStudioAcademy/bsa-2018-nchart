import { ProjectDomain, ResponseScheme, Project } from '@app/models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';

@Injectable()
export class ProjectDomainService implements ProjectDomain {
	private projectPath = '/api/project';

	constructor(private httpService: HttpService) {}

	getAll(): Observable<ResponseScheme<Project[]>> {
		return this.httpService.makeRequest<ResponseScheme<Project[]>>(
			new ServiceRequest(
				RequestType.GET,
				`${this.projectPath}/test`,
				null
			)
		);
	}

	save(payload: { project: Project }): Observable<ResponseScheme<Project>> {
		return this.httpService.makeRequest<ResponseScheme<Project>>(
			new ServiceRequest(
				RequestType.POST,
				this.projectPath,
				null,
				payload
			)
		);
	}

	update(payload: { project: Project }): Observable<ResponseScheme<Project>> {
		const s = this.httpService.makeRequest<ResponseScheme<Project>>(
			new ServiceRequest(
				RequestType.PUT,
				`/${this.projectPath}/${payload.project.id}`,
				null,
				payload.project
			)
		);
		return s;
	}

	delete(payload: { projectId: string }): Observable<ResponseScheme<null>> {
		const s = this.httpService.makeRequest<ResponseScheme<null>>(
			new ServiceRequest(
				RequestType.DELETE,
				`/${this.projectPath}/${payload.projectId}`,
				null,
				payload
			)
		);
		return s;
	}

	get(payload: { projectId: string }): Observable<ResponseScheme<Project>> {
		return this.httpService.makeRequest<ResponseScheme<Project>>(
			new ServiceRequest(
				RequestType.GET,
				`${this.projectPath}/${payload.projectId}`
			)
		);
	}
}
