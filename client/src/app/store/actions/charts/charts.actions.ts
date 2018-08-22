import { ChartsActionConstants } from './charts.action-types';
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

export class CreateChart extends AppAction<{
	datatsetId: SchemeID;
}> {
	readonly type = ChartsActionConstants.CREATE_CHART;
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
	| SelectChart
	| SelectChartComplete
	| CreateChartComplete
	| CreateChart;
