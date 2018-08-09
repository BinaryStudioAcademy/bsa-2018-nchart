import { AppState } from '@app/models';

export const projects = (state: AppState) => {
	return state.projects.all.map(id => state.projects.byId[id]);
};
