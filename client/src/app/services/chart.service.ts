import { Injectable } from '@angular/core';
import { DimensionOption } from '@app/models/chart.model';
import { DimensionColumnMap } from '../models/chart.model';
import { v4 } from 'uuid';
import { of } from 'rxjs/index';

@Injectable()
export class ChartService {
	transformDimensions(dimensions: DimensionOption[]): DimensionColumnMap[] {
		return dimensions.map(el => ({
			id: el.id,
			columnId: null
		}));
	}

	createChart({
		chartTypeId,
		datasetId,
		customizeSettings,
		dimensionSettings
	}) {
		return of({
			id: v4(),
			chartTypeId,
			datasetId,
			customizeSettings,
			dimensionSettings
		});
	}
}
