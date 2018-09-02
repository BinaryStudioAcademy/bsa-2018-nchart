import {Observable} from 'rxjs';
import {OriginProject} from '@app/models/project.model';
import {ResponseScheme} from '@app/models/response-scheme.model';

export interface ProjectDomain {
	save(payload: {
		project: OriginProject;
	}): Observable<ResponseScheme<OriginProject>>;

	update(payload: {
		project: OriginProject;
	}): Observable<ResponseScheme<OriginProject>>;

	delete(payload: { projectId: number, accessLevelId: number }): Observable<ResponseScheme<null>>;

	getByProjectId(payload: {
		projectId: string;
	}): Observable<ResponseScheme<OriginProject>>;

	getByGroupId(payload: {
		groupId: string;
	}): Observable<ResponseScheme<OriginProject>>;

	// todo: add token to header
	getPartByUserId(): Observable<ResponseScheme<any[]>>;

	getAll(): Observable<ResponseScheme<OriginProject[]>>;

	share(payload: {
		projectId: number;
		email: string;
		accessLevelId: number;
	}): Observable<ResponseScheme<any>>;
}
