import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';
import { NormalizedSchemeField, SchemeID } from '@app/models/normalizr.model';
import {
	DimensionOption,
	CustomizeOption,
	Chart
} from '@app/models/chart.model';
import { DimensionColumnMap } from '@app/models/chart.model';
import { UserChart } from '@app/models/user-chart-store.model';
import { AppAction, FailedAction } from '@app/models/store.model';

export class LoadCharts extends AppAction<any> {
	readonly type = ChartsActionConstants.LOAD_CHARTS;
}

export class LoadChartsComplete extends AppAction<{
	charts: {
		all: SchemeID[];
		entities: {
			dimensionSetting: NormalizedSchemeField<DimensionOption>;
			customizeSetting: NormalizedSchemeField<CustomizeOption>;
			chart: NormalizedSchemeField<Chart<SchemeID[], SchemeID[]>>;
		};
	};
}> {
	readonly type = ChartsActionConstants.LOAD_CHARTS__COMPLETE;
}

export class LoadChartsFailed extends FailedAction {
	readonly type = ChartsActionConstants.LOAD_CHARTS__FAILED;
}

export class SelectChart extends AppAction<any> {
	readonly type = ChartsActionConstants.SELECT_CHART;
}

export class PickActiveChart extends AppAction<{
	id: SchemeID;
}> {
	readonly type = ChartsActionConstants.PICK_ACTIVE_CHART;
}

export class SetDatasetChart extends AppAction<{
	datatsetId: SchemeID;
	chartId: SchemeID;
}> {
	readonly type = ChartsActionConstants.SET_DATASET_CHART;
}

export class ChangeCustomSettings extends AppAction<{
	[key: string]: any;
}> {
	readonly type = ChartsActionConstants.CHANGE_CUSTOM_SETTINGS;
}

export class SetDimension extends AppAction<{
	dimensionId: SchemeID;
	columnId: SchemeID;
}> {
	readonly type = ChartsActionConstants.SET_DIMENSION;
}

export class RemoveDimension extends AppAction<{
	dimensionId: SchemeID;
	columnId: SchemeID;
}> {
	readonly type = ChartsActionConstants.REMOVE_DIMENSION;
}

export class RemoveChart extends AppAction<void> {
	readonly type = ChartsActionConstants.REMOVE_CHART;
}

export class RemoveChartComplete extends AppAction<{
	id: SchemeID;
	datasetId: SchemeID;
	projectId: SchemeID;
}> {
	readonly type = ChartsActionConstants.REMOVE_CHART__COMPLETE;
}

export class RemoveChartFailed extends AppAction<any> {
	readonly type = ChartsActionConstants.REMOVE_CHART__FAILED;
}

export class RemoveAllDimension extends AppAction<{
	chartId: SchemeID
}> {
	readonly type = ChartsActionConstants.REMOVE_ALL_DIMENSION;
}

export class CreateChart extends AppAction<{
	datatsetId: SchemeID;
}> {
	readonly type = ChartsActionConstants.CREATE_CHART;
}

export class CreateChartFailed extends FailedAction {
	readonly type = ChartsActionConstants.CREATE_CHART__FAILED;
}

export class CreateChartComplete extends AppAction<{
	projectId: SchemeID;
	chart: {
		chartId: SchemeID;
		entities: {
			chart: NormalizedSchemeField<UserChart>;
			dimensionSetting: NormalizedSchemeField<DimensionColumnMap>;
			customizeSetting: NormalizedSchemeField<CustomizeOption>;
		};
	};
}> {
	readonly type = ChartsActionConstants.CREATE_CHART__COMPLETE;
}

export class SelectChartComplete extends AppAction<any> {
	readonly type = ChartsActionConstants.SELECT_CHART__COMPLETE;
}

export type Actions =
	| LoadCharts
	| LoadChartsComplete
	| LoadChartsFailed
	| SetDatasetChart
	| PickActiveChart
	| ChangeCustomSettings
	| SetDimension
	| RemoveChart
	| RemoveChartComplete
	| RemoveChartFailed
	| RemoveDimension
	| RemoveAllDimension
	| SelectChart
	| SelectChartComplete
	| CreateChartComplete
	| CreateChartFailed
	| CreateChart;
