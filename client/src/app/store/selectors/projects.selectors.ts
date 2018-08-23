import { AppState, Project } from '@app/models';
import { SchemeID } from '@app/models/normalizr.model';

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

export const isProjectCharts = (id?: SchemeID) => (
	state: AppState
): boolean => {
	const selectedProject = project(id)(state);

	if (selectedProject) {
		return !!selectedProject.charts.length;
	}

	return false;
};
