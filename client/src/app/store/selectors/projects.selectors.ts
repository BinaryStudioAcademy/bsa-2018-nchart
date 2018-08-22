import { SchemeID } from '@app/models/normalizr.model';
import { AppState } from '@app/models/store.model';
import { Project } from '@app/models/project.model';

export const projects = () => (state: AppState) =>
	state.projects.all.map(id => state.projects.byId[id]);

export const project = (id?: SchemeID) => (state: AppState): Project =>
	state.projects.byId[id || state.projects.active]
		? state.projects.byId[id || state.projects.active]
		: null;

export const isProjectDataset = (id?: SchemeID) => (
	state: AppState
): boolean => {
	const selectedProject = project(id)(state);

	if (selectedProject) {
		return !!selectedProject.datasets.length;
	}

	return false;
};

export const getActiveProject = () => (state: AppState) =>
	state.projects.active;
