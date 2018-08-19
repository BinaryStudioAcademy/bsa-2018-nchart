import { DatasetDataState } from '@app/models/dataset.model';

export const initialState: DatasetDataState = { };

export const datasetDataReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
