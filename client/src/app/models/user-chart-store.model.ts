import { SchemeID, NormalizedActiveEntity, NormalizedSchemeWithoutAll } from './normalizr.model';
import { DimensionColumnMap } from './chart.model';
import { CustomizeOption } from '@app/models/chart.model';

export class UserChartsState<U = SchemeID, R = undefined>
	extends NormalizedSchemeWithoutAll<UserCharts, R>
	implements NormalizedActiveEntity<U, R> {
		active = null;
}

export interface UserCharts {
	id: SchemeID;
	datasetId: SchemeID;
	chartTypeId: SchemeID;
	dimensionSettings: {
		[key: string]: DimensionColumnMap;
	};
	customizeSettings: {
		[key: string]: CustomizeOption;
	};
}
