import { UserState } from '@app/models/user-store.model';
import { ErrorHandlerState } from '@app/models/error-store.model';
import { ExportProjectState } from '@app/models/export-store.model';
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
import { DatasetPreloadSamplesState } from '@app/models/dataset-store.model';
import {RouterStateUrl} from '@app/models/router-state-url.model';
import {RouterReducerState} from '@ngrx/router-store';

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
	exportProject: ExportProjectState;
	datasetColumns: DatasetColumnState;
	datasetData: DatasetDataState;
	defaultChartSettings: DefaultChartSettingsState;
	userChartSettings: UserChartSettingsState;
	datasetPreload: DatasetPreloadSamplesState;
	router?: RouterReducerState<RouterStateUrl>;
}
