import { AppAction } from '@app/models';
import { ChartActionConstants } from './chart.action-types';

export class ChangeId extends AppAction<{ id }> {
	readonly type = ChartActionConstants.CHART_CHANGE_ID;
}

export class ChangeCustomize extends AppAction<any> {
	readonly type = ChartActionConstants.CHART_CHANGE_CUSTOMIZE;
}

export type Actions = ChangeId | ChangeCustomize;
