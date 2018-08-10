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
		case CompaniesActionConstants.COMPANIES_LOAD_DATA:
			return [];
		case CompaniesActionConstants.COMPANIES_LOAD_DATA__COMPLETE:
			return action.payload.companies.all;
		default:
			return state;
	}
};

const byId = (state = initialState.byId, action: CompaniesActions) => {
	switch (action.type) {
		case CompaniesActionConstants.COMPANIES_LOAD_DATA:
			return {};
		case CompaniesActionConstants.COMPANIES_LOAD_DATA__COMPLETE:
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
		case CompaniesActionConstants.COMPANIES_LOAD_DATA:
			return true;
		case CompaniesActionConstants.COMPANIES_LOAD_DATA__COMPLETE:
		case CompaniesActionConstants.COMPANIES_LOAD_DATA__FAILED:
			return false;
		default:
			return state;
	}
};

const reducers = {
	all,
	byId,
	isLoading
};

export const companiesReducer = combineReducers(reducers);
