import { UserState } from './user-store.model';
import { ErrorHandlerState } from './error-store.model';
import {
	DefaultChartSettingsState,
	UserChartSettingsState
} from '@app/models/chart.model';
import {
	DatasetColumnState,
	DatasetDataState
} from '@app/models/dataset.model';
import {
	ChartsState,
	UserChartsState,
	DatasetState,
	ProjectsState,
	CompaniesState
} from '@app/models';

export class AppAction<T = undefined> {
	readonly type: string;
	constructor(public payload?: T) {}
}

export class FailedActionPayload {
	msg: string;
	action: any;
	error: Error;
	serverMessages?: string[];
}

export class FailedAction extends AppAction<FailedActionPayload> {}

export interface AppState {
	user: UserState;
	errorHandler: ErrorHandlerState;
	companies: CompaniesState;
	projects: ProjectsState;
	charts: ChartsState;
	datasets: DatasetState;
	userCharts: UserChartsState;
	datasetColumns: DatasetColumnState;
	datasetData: DatasetDataState;
	defaultChartSettings: DefaultChartSettingsState;
	userChartSettings: UserChartSettingsState;
}
