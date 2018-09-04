import { SchemeID } from '@app/models/normalizr.model';
import { AppState } from '@app/models/store.model';
import { Project } from '@app/models/project.model';

export const projects = () => (state: AppState) =>
	state.projects.all.map(id => state.projects.byId[id]);

export const project = (id?: SchemeID) => (state: AppState): Project =>
	state.projects.byId[id || state.projects.active]
		? state.projects.byId[id || state.projects.active]
		: null;

export const activeProjectId = () => (state: AppState): SchemeID =>
	state.projects.active ? state.projects.active : null;

export const isDraftActiveProject = () => (state: AppState): boolean =>
	project()(state) && project()(state).isDraft;

export const projectCharts = () => (state: AppState) => {
	const proj = project()(state);
	if (proj) {
		return proj.charts;
	}
	return [];
};

export const getAmountUserCharts = () => (state: AppState) =>
	projectCharts()(state).length;

export const isProjectDataset = (id?: SchemeID) => (
	state: AppState
): boolean => {
	const selectedProject = project(id)(state);

	if (selectedProject && selectedProject.datasets) {
		return !!selectedProject.datasets.length;
	}

	return false;
};

export const isActiveDraft = () => (state: AppState) => {
	const p = project()(state);

	if (p) {
		return p.isDraft;
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

export const hasActiveProject = () => (state: AppState): boolean => {
	return !!state.projects.active;
};

export const isProjectsLoading = () => (state: AppState) =>
	state.projects.isLoading;

export const getCountProjectDatasets = (id?: SchemeID) => (
	state: AppState
): number => {
	const selectedProject = project(id)(state);

	if (selectedProject) {
		return selectedProject.datasets.length;
	}

	return 0;
};

export const getActiveProject = () => (state: AppState) =>
	state.projects.active;
