import { Project } from '@app/models/project.model';
import {
	NormalizedSchemeWithFetching,
	SchemeID,
	NormalizedActiveEntity
} from '@app/models/normalizr.model';

export class ProjectsState<U = SchemeID, R = undefined>
	extends NormalizedSchemeWithFetching<Project, R>
	implements NormalizedActiveEntity<U, R> {
	active = null;
}
