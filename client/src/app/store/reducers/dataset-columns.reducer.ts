import { DatasetColumnState } from '@app/models/dataset.model';

export const initialState: DatasetColumnState = { };

export const datasetColumnsReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
