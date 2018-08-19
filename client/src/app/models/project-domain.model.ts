import { Observable } from 'rxjs';
import { ResponseScheme, Project } from '@app/models';

export interface ProjectDomain {
	save(payload: { project: Project }): Observable<ResponseScheme<Project>>;

	update(payload: { project: Project }): Observable<ResponseScheme<Project>>;

	delete(payload: { projectId: string }): Observable<ResponseScheme<null>>;

	get(payload: { projectId: string }): Observable<ResponseScheme<Project>>;

	getAll(): Observable<ResponseScheme<Project[]>>;
}
