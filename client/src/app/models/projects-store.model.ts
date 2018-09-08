import { Project } from '@app/models/project.model';
import {
	NormalizedSchemeWithFetching,
	SchemeID,
	NormalizedActiveEntity
} from '@app/models/normalizr.model';

export interface PaginationData {
	pageCount: number;
	page: number;
	totalRecords: number;
	rows: number;
}

export class ProjectsState<U = SchemeID, R = undefined>
	extends NormalizedSchemeWithFetching<Project, R>
	implements NormalizedActiveEntity<U, R> {
	active = null;
	pagination: PaginationData;
}
