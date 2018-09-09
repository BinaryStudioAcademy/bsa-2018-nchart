import { Observable } from 'rxjs';
import {OriginProject, ProjectPreview} from '@app/models/project.model';
import { ResponseScheme } from '@app/models/response-scheme.model';
import { SchemeID } from '@app/models/normalizr.model';
import { PaginationData } from '@app/models/projects-store.model';

export interface ProjectDomain {
	save(payload: {
		project: OriginProject;
	}): Observable<ResponseScheme<OriginProject>>;

	updateName(payload: {
		id: SchemeID;
		name: string;
	}): Observable<ResponseScheme<OriginProject>>;

	delete(payload: {
		projectId: SchemeID;
		accessLevelId: number;
	}): Observable<ResponseScheme<null>>;

	getByProjectId(payload: {
		projectId: string;
	}): Observable<ResponseScheme<OriginProject>>;

	getByGroupId(payload: {
		groupId: string;
	}): Observable<ResponseScheme<OriginProject>>;

	getPartByUserId(payload: {
		page: number;
		name?: string;
	}): Observable<ResponseScheme<{projects: ProjectPreview[], pagination: PaginationData}>>;

	getAll(): Observable<ResponseScheme<OriginProject[]>>;

	share(payload: {
		projectId: number;
		email: string;
		accessLevelId: number;
	}): Observable<ResponseScheme<any>>;
}
