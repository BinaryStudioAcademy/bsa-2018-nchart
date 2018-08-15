import { Actions as ChartActions } from '../actions/chart/chart.actions';
import { ChartActionConstants } from '../actions/chart/chart.action-types';
import { UserChartState } from '@app/models';

export const initialState: UserChartState = {
	id: null,
	customize_settings: null
};

export const userChartReducer = (
	state = initialState,
	action: ChartActions
) => {
	switch (action.type) {
		case ChartActionConstants.CHART_CHANGE_ID: {
			return {
				...state,
				id: action.payload.id
			};
		}
		case ChartActionConstants.CHART_CHANGE_CUSTOMIZE: {
			return {
				...state,
				customize_settings: action.payload.customize_settings
			};
		}
		default:
			return state;
	}
};
