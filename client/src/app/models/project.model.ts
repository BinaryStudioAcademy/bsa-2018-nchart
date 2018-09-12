import { SchemeID, NormalizedSchemeField } from '@app/models/normalizr.model';
import {
	DatasetTable,
	DatasetDataState,
	DatasetColumnState,
	Dataset
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
	dataset: NormalizedSchemeField<Dataset>;
	project: NormalizedSchemeField<Project>;
	datasetData: DatasetDataState;
	datasetColumn: DatasetColumnState;
}

export interface ProjectsFilter {
	page: number;
	title?: string;
	from?: string;
	to?: string;
	charts?: string;
	owner?: string | string[];
}

export class ProjectFilterForm {
	page = 1;
	title = '';
	charts: string[] = [];
	owner: ProjectOwnershipFilter[] = [];
	date: string[] = [];
}

export enum ProjectOwnershipFilter {
	me = 'me',
	shared = 'shared',
	all = 'all'
}

interface UserPreview {
	name: string;
	email: string;
}

export interface ProjectPreview {
	id: SchemeID;
	name: string;
	updatedAt: string;
	groupName: string;
	companyName: string;
	accessLevelId: SchemeID;
	userCharts: string[];
	user: UserPreview;
}
