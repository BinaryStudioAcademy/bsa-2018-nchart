import { Observable } from 'rxjs';
import { ResponseScheme } from '@app/models/response-scheme.model';
import { Chart } from '@app/models/chart.model';

export interface ChartTypeDomain {
	getAll(): Observable<ResponseScheme<Chart[]>>;
}
