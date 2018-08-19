import { DatasetState } from '@app/models';

export const initialState: DatasetState = { };

export const datasetReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
