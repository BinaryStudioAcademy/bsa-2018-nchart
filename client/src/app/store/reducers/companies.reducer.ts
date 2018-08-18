import { Actions as CompaniesActions } from '../actions/companies/companies.actions';
import { CompaniesActionConstants } from '@app/store/actions/companies/companies.action-types';
import { combineReducers } from '@ngrx/store';
import { CompaniesState } from '@app/models/companies-store.model';

export const initialState: CompaniesState = {
	byId: {},
	all: [],
	isLoading: false
};

const all = (state = initialState.all, action: CompaniesActions) => {
	switch (action.type) {
		case CompaniesActionConstants.LOAD_COMPANIES:
			return [];
		case CompaniesActionConstants.LOAD_COMPANIES__COMPLETE:
			return action.payload.companies.all;
		default:
			return state;
	}
};

const byId = (state = initialState.byId, action: CompaniesActions) => {
	switch (action.type) {
		case CompaniesActionConstants.LOAD_COMPANIES:
			return {};
		case CompaniesActionConstants.LOAD_COMPANIES__COMPLETE:
			return action.payload.companies.byId;
		default:
			return state;
	}
};

export const isLoading = (
	state = initialState.isLoading,
	action: CompaniesActions
): boolean => {
	switch (action.type) {
		case CompaniesActionConstants.LOAD_COMPANIES:
			return true;
		case CompaniesActionConstants.LOAD_COMPANIES__COMPLETE:
		case CompaniesActionConstants.LOAD_COMPANIES__FAILED:
			return false;
		default:
			return state;
	}
};

const reducers: CompaniesState<CompaniesActions> = {
	all,
	byId,
	isLoading
};

export const companiesReducer = combineReducers(reducers);
