import { AppState } from '@app/models';

export const companies = (state: AppState) => {
	return state.companies.all.map(id => state.companies.byId[id]);
};
