import { AppAction, Chart, FailedAction } from '@app/models';
import { ChartsActionConstants } from '@app/store/actions/charts/charts.action-types';

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

export type Actions = LoadCharts | LoadChartsComplete | LoadChartsFailed;
