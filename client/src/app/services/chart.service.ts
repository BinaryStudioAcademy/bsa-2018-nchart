import { Injectable } from '@angular/core';
import { DimensionOption } from '@app/models/chart.model';
import { DimensionColumnMap } from '../models/chart.model';

@Injectable()
export class ChartService {
	transformDimensions(dimensions: DimensionOption[]): DimensionColumnMap[] {
		return dimensions.map(el => ({
			id: el.id,
			columnId: null
		}));
	}
}
