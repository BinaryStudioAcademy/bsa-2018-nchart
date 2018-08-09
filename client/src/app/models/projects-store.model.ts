import { Project } from './project.model';

export interface ProjectsState {
	all: Array<string>;
	byId: { [id: string]: Project };
	isLoading: boolean;
}
