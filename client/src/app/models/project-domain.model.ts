import { Observable } from 'rxjs';
import { OriginProject } from '@app/models/project.model';
import { ResponseScheme } from '@app/models/response-scheme.model';

export interface ProjectDomain {
	save(payload: {
		project: OriginProject;
	}): Observable<ResponseScheme<OriginProject>>;

	update(payload: {
		project: OriginProject;
	}): Observable<ResponseScheme<OriginProject>>;

	delete(payload: { projectId: string }): Observable<ResponseScheme<null>>;

	get(payload: {
		projectId: string;
	}): Observable<ResponseScheme<OriginProject>>;

	getAll(): Observable<ResponseScheme<OriginProject[]>>;
}
