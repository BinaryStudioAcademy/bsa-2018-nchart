import { AppAction, Chart, FailedAction } from '@app/models';
import { ChartsActionConstants } from './charts.action-types';

export class LoadCharts extends AppAction<any> {
	readonly type = ChartsActionConstants.LOAD_CHARTS;
}

export class LoadChartsComplete extends AppAction<{
	charts: {
		all: Array<string>;
		byId: { [id: string]: Chart };
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
	datatsetId: string | number
}> {
	readonly type = ChartsActionConstants.CREATE_CHART;
}

export class CreateChartComplete extends AppAction<any> {
	readonly type = ChartsActionConstants.CREATE_CHART__COMPLETE;
}

export class SelectChartComplete extends AppAction<any> {
	readonly type = ChartsActionConstants.SELECT_CHART__COMPLETE;
}

export type Actions = LoadCharts | LoadChartsComplete | LoadChartsFailed | SelectChart | SelectChartComplete | CreateChartComplete | CreateChart;
