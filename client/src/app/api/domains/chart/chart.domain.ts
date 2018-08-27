import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';
import {ChartTypeDomain} from '@app/models/chartType-domain.model';
import { ResponseScheme } from '@app/models/response-scheme.model';
import {Chart} from '@app/models/chart.model';

@Injectable()
export class ChartTypeDomainService implements ChartTypeDomain {
	private chartPath = '/api/chart-type';

	constructor(private httpService: HttpService) {}

	getAll(): Observable<ResponseScheme<Chart[]>> {
		return this.httpService.makeRequest<ResponseScheme<Chart[]>>(
			new ServiceRequest(RequestType.GET, `${this.chartPath}`, null)
		);
	}
}
