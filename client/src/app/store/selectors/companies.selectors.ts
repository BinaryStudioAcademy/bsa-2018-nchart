import { AppState } from '@app/models';

export const companies = (state: AppState) =>
	state.companies.all.map(id => state.companies.byId[id]);
