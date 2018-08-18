import { ProjectDomain, ResponseScheme, Project } from '@app/models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';

@Injectable()
export class ProjectDomainService implements ProjectDomain {
	private projectPath = '/project';

	constructor(private httpService: HttpService) {}

	save(payload: { project: Project }): Observable<ResponseScheme<Project>> {
		const s = this.httpService.makeRequest<ResponseScheme<Project>>(
			new ServiceRequest(
				RequestType.POST,
				this.projectPath,
				null,
				payload
			)
		);
		s
			.subscribe
			// () => console.log('subscribe1'),
			();
		return s;
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
		const s = this.httpService.makeRequest<ResponseScheme<null>>(
			new ServiceRequest(
				RequestType.GET,
				`/${this.projectPath}/${payload.projectId}`,
				null
			)
		);
		return s;
	}

	getAll(): Observable<ResponseScheme<Project[]>> {
		const s = this.httpService.makeRequest<ResponseScheme<Project[]>>(
			new ServiceRequest(RequestType.GET, `/${this.projectPath}`, null)
		);
		return s;
	}
}
