import { AppState } from '@app/models/store.model';
import { Params } from '@angular/router';

export const getRouter = () => (state: AppState) => {
	if (state.router) {
		return state.router.state;
	}
	return null;
};

export const getRouterParams = () => (state: AppState): Params => {
	if (state.router) {
		return state.router.state.params;
	}
	return null;
};

export const getRouterQueryParams = () => (state: AppState): Params => {
	if (state.router) {
		return state.router.state.queryParams;
	}
	return null;
};

export const getRouterUrl = () => (state: AppState): string => {
	if (state.router) {
		return state.router.state.url;
	}
	return null;
};
