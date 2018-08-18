import { AppState } from '@app/models';
import { SchemeID } from '@app/models/normalizr.model';

export const dataset = (id: SchemeID) =>
	(state: AppState) =>
		state.datasets.byId[id]
			? state.datasets.byId[id]
			: null;

export const chartDataset = (id?: SchemeID) =>
	(state: AppState) => {
		const chart = state.userCharts.byId[id || state.userCharts.active];

		if (chart) {
			return dataset(chart.datasetId)(state);
		}

		return null;
	};
