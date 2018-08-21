import {
	SchemeID,
	NormalizedActiveEntity,
	NormalizedSchemeWithoutAll
} from './normalizr.model';

export class UserChartsState<U = SchemeID, R = undefined>
	extends NormalizedSchemeWithoutAll<UserChart, R>
	implements NormalizedActiveEntity<U, R> {
	active = null;
}

export class UserChart {
	id: SchemeID = null;
	datasetId: SchemeID = null;
	chartTypeId: SchemeID = null;
	dimensionSettings: SchemeID[];
	customizeSettings: SchemeID[];
}

export interface UserMappingColumn {
	id: SchemeID;
	variable: string;
	type: string;
}
