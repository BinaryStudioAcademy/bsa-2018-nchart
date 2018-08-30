import { SchemeID } from '@app/models/normalizr.model';
import { Dataset } from '../../models/dataset.model';
import { AppState } from '@app/models/store.model';
import { DatasetColumn } from '@app/models/dataset.model';

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
	const activeDataset = chartDataset()(state);
	if (activeDataset) {
		return activeDataset.modified.data.map(
			d => d.map(id => state.datasetData[id])
		);
	}
	return [];
};

export const getDatasetHeaders = () => (state: AppState): DatasetColumn[] => {
	const activeDataset = chartDataset()(state);

	if (activeDataset) {
		return activeDataset.modified.columns.map(
			id => state.datasetColumns[id]
		);
	}

	return [];
};

export const activeDatasetId = () => (state: AppState) => {
	const d = chartDataset()(state);

	if (d) {
		return d.id;
	}

	return null;
};

export const isDatasetLoading = () => (state: AppState) =>
	state.datasets.isLoading;
