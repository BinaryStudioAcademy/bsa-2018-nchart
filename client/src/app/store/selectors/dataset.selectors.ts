import { SchemeID } from '@app/models/normalizr.model';
import { Dataset } from '../../models/dataset.model';
import { AppState } from '@app/models/store.model';

export const dataset = (id: SchemeID) => (state: AppState): Dataset =>
	state.datasets[id] ? state.datasets[id] : null;

export const chartDataset = (id?: SchemeID) => (state: AppState) => {
	const chart = state.userCharts.byId[id || state.userCharts.active];

	if (chart) {
		return dataset(chart.datasetId)(state);
	}

	return null;
};
