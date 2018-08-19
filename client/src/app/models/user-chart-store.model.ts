import {
	SchemeID,
	NormalizedActiveEntity,
	NormalizedSchemeWithoutAll
} from '@app/models/normalizr.model';
import { DimensionColumnMap } from '@app/models/chart.model';
import { CustomizeOption } from '@app/models/chart.model';

export class UserChartsState<U = SchemeID, R = undefined>
	extends NormalizedSchemeWithoutAll<UserCharts, R>
	implements NormalizedActiveEntity<U, R> {
	active = null;
}

export class UserCharts {
	id: SchemeID = null;
	datasetId: SchemeID = null;
	chartTypeId: SchemeID = null;
	dimensionSettings: {
		[key: string]: DimensionColumnMap;
	};
	customizeSettings: {
		[key: string]: CustomizeOption;
	};
}
