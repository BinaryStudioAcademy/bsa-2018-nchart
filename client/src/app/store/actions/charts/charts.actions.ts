import { AppAction, Chart, FailedAction } from '@app/models';
import { ChartsActionConstants } from './charts.action-types';

export class LoadData extends AppAction<any> {
	readonly type = ChartsActionConstants.CHARTS_LOAD_DATA;
}

export class LoadDataComplete extends AppAction<{
	charts: {
		all: Array<string>;
		byId: { [id: string]: Chart };
	};
}> {
	readonly type = ChartsActionConstants.CHARTS_LOAD_DATA__COMPLETE;
}

export class LoadDataFailed extends FailedAction {
	readonly type = ChartsActionConstants.CHARTS_LOAD_DATA__FAILED;
}

export type Actions = LoadData | LoadDataComplete | LoadDataFailed;
