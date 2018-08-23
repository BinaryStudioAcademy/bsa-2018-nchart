import { SchemeID } from '@app/models/normalizr.model';
import {
	UserChart,
	UserMappingColumn
} from '@app/models/user-chart-store.model';
import { dataset } from './dataset.selectors';
import { AppState } from '@app/models/store.model';
import { Chart } from '@app/models/chart.model';

export const getAllCharts = () => (state: AppState) =>
	state.charts.all.map(id => state.charts.byId[id]);

export const getListChart = () => (state: AppState) =>
	state.charts.all.map(id => {
		const c = state.charts.byId[id];
		return {
			id: c.id,
			name: c.name,
			type: c.type,
			description: c.description
		};
	});

export const chart = (id?: SchemeID) => (state: AppState): UserChart =>
	state.userCharts.byId[id || state.userCharts.active]
		? state.userCharts.byId[id || state.userCharts.active]
		: null;

export const getChart = id => (state: AppState) => {
	const c = state.charts.byId[id];
	return {
		...chart,
		dimensionSettings: c.dimensionSettings.map(
			i => state.defaultChartSettings.dimensionSettings[i]
		),
		customizeSettings: c.customizeSettings.map(
			i => state.defaultChartSettings.customizeSettings[i]
		)
	};
};

export const getActiveChartId = () => (state: AppState) =>
	state.userCharts.active;

export const getFirstChart = () => (state: AppState): Chart => {
	const fChart: Chart<SchemeID[], SchemeID[]> =
		state.charts.byId[state.charts.all[0]];

	return {
		...fChart,
		dimensionSettings: fChart.dimensionSettings.map(
			id => state.defaultChartSettings.dimensionSettings[id]
		),
		customizeSettings: fChart.customizeSettings.map(
			id => state.defaultChartSettings.customizeSettings[id]
		)
	};
};

export const isChartsLoading = () => (state: AppState) =>
	state.charts.isLoading;

export const mappingColumns = () => (state: AppState): UserMappingColumn[] => {
	const c: UserChart = chart()(state);

	if (c) {
		const d = dataset(c.datasetId)(state);

		if (d) {
			return d.modified.columns.map(
				id =>
					({
						variable: state.datasetColumns[id].title,
						type: state.datasetColumns[id].type,
						id: state.datasetColumns[id].id
					} as UserMappingColumn)
			);
		}

		return [];
	}

	return [];
};

export const mappingDimensions = () => (state: AppState): any => {
	const c: UserChart = chart()(state);

	if (c) {
		return c.dimensionSettings.map(id => {
			const columnId =
				state.userChartSettings.dimensionSettings[id].columnId;
			const column = state.datasetColumns[columnId as SchemeID];
			const value = [];
			if (columnId !== null) {
				value.push({
					variable: column.title,
					type: column.type,
					id: column.id
				});
			}
			return {
				value: value,
				...state.defaultChartSettings.dimensionSettings[id]
			};
		});
	}

	return [];
};

export const getCustomizeSettings = () => (state: AppState) => {
	const aChart = chart()(state);
	if (aChart) {
		return aChart.customizeSettings.reduce((obj, id) => {
			const option = state.defaultChartSettings.customizeSettings[id];
			obj[`set${id}`] = { ...option };
			return obj;
		}, {});
	}
	return [];
};

export const getIndexCol = colId => (state: AppState) => {
	const datasetId = state.userCharts.byId[state.userCharts.active].datasetId;
	return state.datasets[datasetId].modified.columns.indexOf(colId);
};

export const getData = () => (state: AppState) => {
	const getRow = ({ id, columnId }) => {
		const name = state.defaultChartSettings.dimensionSettings[id].variable;
		let values = [];
		if (columnId !== null) {
			const indexCol = getIndexCol(columnId)(state);
			const datasetId =
				state.userCharts.byId[state.userCharts.active].datasetId;

			values = state.datasets[datasetId].modified.data.map(arrId => {
				return state.datasetData[arrId[indexCol]].value;
			});

			return { name, values };
		} else {
			return { name, values };
		}
	};

	const dimens = state.userChartSettings.dimensionSettings;

	const acc = [];
	for (const dimenId in dimens) {
		acc.push(
			getRow({
				id: dimenId,
				columnId: dimens[dimenId].columnId
			})
		);
	}

	return acc;
};

export const isChartsReady = () => (state: AppState) => state.charts.all.length;
