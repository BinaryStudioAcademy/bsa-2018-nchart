import { SchemeID } from '@app/models/normalizr.model';
import { AppState } from '@app/models/store.model';
import {
	UserMappingColumn,
	UserChart
} from '@app/models/user-chart-store.model';
import { dataset } from '@app/store/selectors/dataset.selectors';

export const userChart = (id?: SchemeID) => (state: AppState): UserChart =>
	state.userCharts.byId[id || state.userCharts.active]
		? state.userCharts.byId[id || state.userCharts.active]
		: null;

export const mappingColumns = () => (state: AppState): UserMappingColumn[] => {
	const c: UserChart = userChart()(state);

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

export const getActiveChartId = () => (state: AppState) =>
	state.userCharts.active;

export const mappingDimensions = () => (state: AppState): any => {
	const c: UserChart = userChart()(state);

	if (c) {
		return c.dimensionSettings.map(id => {
			const columnIds =
				state.userChartSettings.dimensionSettings[id].columnIds;

			const value = [];
			if (columnIds.length) {
				columnIds.reduce((values, columnId) => {
					const column = state.datasetColumns[columnId];
					values.push({
						variable: column.title,
						type: column.type,
						id: column.id
					});
					return values;
				}, value);
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
	const aChart = userChart()(state);
	if (aChart) {
		return aChart.customizeSettings.reduce((obj, id) => {
			const option = state.userChartSettings.customizeSettings[id];
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
	const getRow = ({ id, columnIds }) => {
		const name = state.defaultChartSettings.dimensionSettings[id].variable;
		const datasetId =
			state.userCharts.byId[state.userCharts.active].datasetId;
		const values = [];

		if (columnIds.length) {
			columnIds.map(columnId => {
				const indexCol = getIndexCol(columnId)(state);
				state.datasets[datasetId].modified.data.reduce(
					(colValues, arrId) => {
						colValues.push(
							state.datasetData[arrId[indexCol]].value
						);
						return colValues;
					},
					values
				);
			});
		}

		return { name, values };
	};

	const dimens = state.userChartSettings.dimensionSettings;

	const acc = [];
	for (const dimenId in dimens) {
		if (dimens.hasOwnProperty(dimenId)) {
			acc.push(
				getRow({
					id: dimenId,
					columnIds: dimens[dimenId].columnIds
				})
			);
		}
	}
	return acc;
};

export const getActiveChart = () => (state: AppState) => {
	const activeUserChart = userChart()(state);
	if (activeUserChart) {
		const c =
			state.charts.byId[
				activeUserChart.chartTypeId || state.userCharts.active
			];
		return {
			id: c.id,
			name: c.name,
			sysName: c.sysName,
			type: c.type,
			description: c.description
		};
	}
};
