import { SchemeID, NormalizedSchemeField } from '@app/models/normalizr.model';
import {
	DatasetTable,
	DatasetState,
	DatasetDataState,
	DatasetColumnState
} from '@app/models/dataset.model';
import {
	Chart,
	CustomizeSettingsState,
	DimensionSettingsState
} from '@app/models/chart.model';
import { UserChart } from '@app/models/user-chart-store.model';

export class Project {
	id: string = null;
	name: string = null;
	datasets: SchemeID[] = [];
	charts: SchemeID[] = [];
	createdAt: string | number = null;
	isDraft: boolean = null;
}

export class OriginProject {
	id: string = null;
	name: string = null;
	datasets: DatasetTable[] = [];
	charts: Chart[] = [];
	createdAt: string | number = null;
	isDraft: boolean = null;
}

export interface ProjectEntities {
	chart: NormalizedSchemeField<UserChart>;
	customizeSetting: CustomizeSettingsState;
	dimensionSetting: DimensionSettingsState;
	dataset: DatasetState;
	project: NormalizedSchemeField<Project>;
	datasetData: DatasetDataState;
	datasetColumn: DatasetColumnState;
}
