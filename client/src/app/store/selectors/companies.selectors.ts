import { AppState } from '@app/models/store.model';

export const companies = (state: AppState) =>
	state.companies.all.map(id => state.companies.byId[id]);
