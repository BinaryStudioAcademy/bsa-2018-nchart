import { SchemeID } from '@app/models/normalizr.model';
import { Dataset } from '../../models/dataset.model';
import { AppState } from '@app/models/store.model';

export const dataset = (id: SchemeID) => (state: AppState): Dataset =>
	state.datasets.byId[id] ? state.datasets.byId[id] : null;

export const chartDataset = (id?: SchemeID) => (state: AppState) => {
	const chart = state.userCharts.byId[id || state.userCharts.active];

	if (chart) {
		return dataset(chart.datasetId)(state);
	}

	return null;
};

export const getDatasetValues = () => (state: AppState) => {
	const activeDataId = chartDataset()(state).modified.data;
	return {
		values: activeDataId.map(d =>
			d.map(id => state.datasetData[id].value)
		),
		ids: activeDataId.map(d =>
			d.map(id => state.datasetData[id].id)
		)
	};
};

export const getDatasetHeaders = () => (state: AppState) => {
	const activeDataId = chartDataset()(state).modified.columns;
	return {
		values: activeDataId.map(col =>
			state.datasetColumns[col].title
		),
		ids: activeDataId.map(col =>
			state.datasetColumns[col].id
		)
	};
};

export const isDatasetLoading = () => (state: AppState) =>
	state.datasets.isLoading;
