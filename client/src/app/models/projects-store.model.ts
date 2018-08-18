import { Project } from './project.model';
import { NormalizedSchemeWithFetching, SchemeID, NormalizedActiveEntity } from './normalizr.model';

export class ProjectsState<U = SchemeID, R = undefined>
	extends NormalizedSchemeWithFetching<Project, R>
	implements NormalizedActiveEntity<U, R> {
		active = null;
}
