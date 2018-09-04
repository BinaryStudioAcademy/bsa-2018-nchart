import { SchemeID } from '@app/models/normalizr.model';
import { AppState } from '@app/models/store.model';
import {
	UserMappingColumn,
	UserChart
} from '@app/models/user-chart-store.model';
import { dataset } from '@app/store/selectors/dataset.selectors';
import {
	Chart,
	CustomizeSettingsState,
	DimensionSettingsState
} from '@app/models/chart.model';
import {
	DatasetColumnState,
	DatasetDataState
} from '@app/models/dataset.model';
import { project } from '@app/store/selectors/projects.selectors';

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

export const getActiveDatasetId = () => (state: AppState) => {
	const uChart = userChart()(state);

	if (uChart) {
		return uChart.datasetId;
	}
	return null;
};

export const hasChartDataset = () => (state: AppState) => {
	const uChart = userChart()(state);

	if (uChart && uChart.datasetId) {
		return true;
	}

	return false;
};

export const getAllUserCharts = () => (state: AppState): UserChart[] => {
	const aProject = project()(state);

	if (aProject) {
		return aProject.charts.map(id => state.userCharts.byId[id]);
	}

	return null;
};

export const isRepeatDataset = (userChartId: SchemeID) => (state: AppState) => {
	const userCharts = getAllUserCharts()(state);

	if (userCharts) {
		const currentChart = userChart(userChartId)(state);

		const counts = userCharts.filter(
			chart => chart.datasetId === currentChart.datasetId
		).length;

		if (counts > 1) {
			return true;
		} else {
			return false;
		}
	}

	return false;
};

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
				...state.defaultChartSettings.dimensionSettings[
					(id as string).slice(37)
				]
			};
		});
	}

	return [];
};

export const getAllChartsByProject = (id: SchemeID) => (state: AppState) => {
	const proj = project(id)(state);

	return proj.charts.reduce((acc, idC) => {
		acc[idC] = userChart(idC)(state);
		return acc;
	}, {});
};

export const getAllDatasetByProject = (id: SchemeID) => (state: AppState) => {
	const proj = project(id)(state);

	return proj.datasets.reduce((acc, idD) => {
		acc[idD] = dataset(idD)(state);
		return acc;
	}, {});
};

export const getDimensionSet = () => (
	state: AppState
): DimensionSettingsState => state.userChartSettings.dimensionSettings;

export const getCustomizeSet = () => (
	state: AppState
): CustomizeSettingsState => state.userChartSettings.customizeSettings;

export const getDatasetCol = () => (state: AppState): DatasetColumnState =>
	state.datasetColumns;

export const getDatasetData = () => (state: AppState): DatasetDataState =>
	state.datasetData;

export const getFullProject = id => (state: AppState) => {
	return {
		chart: getAllChartsByProject(id)(state),
		dataset: getAllDatasetByProject(id)(state),
		datasetColumn: getDatasetCol()(state),
		datasetData: getDatasetData()(state),
		project: {
			[id]: project(id)(state)
		},
		dimensionSetting: getDimensionSet()(state),
		customizeSetting: getCustomizeSet()(state)
	};
};

export const getCustomizeSettings = () => (state: AppState) => {
	const aChart = userChart()(state);
	if (aChart) {
		return aChart.customizeSettings.reduce((obj, id) => {
			const option = state.userChartSettings.customizeSettings[id];
			obj[option.sysName] = { ...option };
			return obj;
		}, {});
	}
	return [];
};

export const getColumnValues = (datasetId: SchemeID, columnId: SchemeID) => (
	state: AppState
) => {
	const dS = dataset(datasetId)(state);
	if (dS) {
		const values = dS.modified.data
			.map(el =>
				el.find((d: string) => d.endsWith(`-${columnId}-${datasetId}`))
			)
			.filter(el => !!el)
			.map(el => state.datasetData[el].value);
		return values;
	}

	return [];
};

export const getData = () => (state: AppState) => {
	const uC = userChart()(state);

	if (uC) {
		const dS = dataset(uC.datasetId)(state);

		if (dS) {
			const values = uC.dimensionSettings.map(id => ({
				name:
					state.defaultChartSettings.dimensionSettings[
						(id as string).slice(37)
					].sysName,
				values: state.userChartSettings.dimensionSettings[id].columnIds
					.map(el => ({
						name: state.datasetColumns[el].title,
						values: getColumnValues(dS.id, el)(state)
					}))
					.reduce((acc, v) => {
						acc = [...acc, v];
						return acc;
					}, [])
			}));
			return values;
		}

		return [];
	}
	return [];
};

export const getActiveChart = () => (
	state: AppState
): Chart<SchemeID[], SchemeID[]> => {
	const activeUserChart = userChart()(state);
	if (activeUserChart) {
		const c = state.charts.byId[activeUserChart.chartTypeId];
		return c;
	}

	return null;
};

export const isRequiredDimensionMatched = () => (state: AppState): boolean => {
	const c = userChart()(state);
	if (c) {
		return c.dimensionSettings
			.map(d => ({
				...state.userChartSettings.dimensionSettings[d],
				required: (
					state.defaultChartSettings.dimensionSettings[
						(d as string).slice(37)
					] || {
						required: false
					}
				).required
			}))
			.filter(el => el.required)
			.every(el => !!el.columnIds.length);
	}

	return false;
};
