import { UserState } from '@app/models/user-store.model';
import { ErrorHandlerState } from '@app/models/error-store.model';
import {
	DefaultChartSettingsState,
	UserChartSettingsState,
	ChartsState
} from '@app/models/chart.model';
import {
	DatasetColumnState,
	DatasetDataState,
	DatasetState
} from '@app/models/dataset.model';
import { CompaniesState } from '@app/models/companies-store.model';
import { ProjectsState } from '@app/models/projects-store.model';
import { UserChartsState } from '@app/models/user-chart-store.model';

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
