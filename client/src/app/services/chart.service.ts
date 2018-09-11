import { Injectable } from '@angular/core';
import { DimensionOption } from '@app/models/chart.model';
import { DimensionColumnMap } from '@app/models/chart.model';
import { v4 } from 'uuid';
import { SchemeID } from '@app/models/normalizr.model';

@Injectable()
export class ChartService {
	transformDimensions(
		userChartId: SchemeID,
		dimensions: DimensionOption[]
	): DimensionColumnMap[] {
		return dimensions.map(el => ({
			id: `${userChartId}-${el.id}`,
			columnIds: []
		}));
	}

	createChart({
		chartTypeId,
		datasetId,
		customizeSettings,
		dimensionSettings
	}) {
		const id = v4();
		return {
			id,
			chartTypeId,
			datasetId,
			customizeSettings,
			dimensionSettings: this.transformDimensions(id, dimensionSettings)
		};
	}
}
