import { Injectable } from '@angular/core';
import { DimensionOption } from '@app/models/chart.model';
import { DimensionColumnMap } from '@app/models/chart.model';
import { v4 } from 'uuid';

@Injectable()
export class ChartService {
	transformDimensions(dimensions: DimensionOption[]): DimensionColumnMap[] {
		return dimensions.map(el => ({
			id: el.id,
			columnIds: []
		}));
	}

	createChart({
		chartTypeId,
		datasetId,
		customizeSettings,
		dimensionSettings
	}) {
		return ({
			id: v4(),
			chartTypeId,
			datasetId,
			customizeSettings,
			dimensionSettings
		});
	}
}
