import { Observable } from 'rxjs';
import { ResponseScheme, OriginProject } from '@app/models';

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
