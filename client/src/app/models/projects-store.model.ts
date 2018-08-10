import { Project } from './project.model';

export interface ProjectsState {
	all: string[];
	byId: { [id: string]: Project };
	isLoading: boolean;
}
