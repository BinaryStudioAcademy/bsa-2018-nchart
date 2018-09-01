import { HttpService } from '@app/api/http/http.service';
import { Observable } from 'rxjs';
import { RequestType } from '@app/models/requestType.model';
import { Injectable } from '@angular/core';
import { DatasetDomain } from '@app/models/dataset-domain.model';
import { ResponseScheme } from '@app/models/response-scheme.model';
import { DatasetColumn } from '@app/models/dataset.model';

@Injectable()
export class DatasetDomainService implements DatasetDomain {
	constructor(private httpService: HttpService) {}

	loadByText({
		text
	}): Observable<
		ResponseScheme<{
			columns?: DatasetColumn[];
			data?: any[][];
		}>
	> {
		return this.httpService.makeRequest({
			type: RequestType.POST,
			url: '/api/data-set/parse',
			payload: {
				text: text
			}
		});
	}

	loadByUrl({
		link
	}): Observable<
		ResponseScheme<{
			columns?: DatasetColumn[];
			data?: any[][];
		}>
	> {
		return this.httpService.makeRequest({
			type: RequestType.POST,
			url: '/api/data-set/parse',
			payload: {
				link: link
			}
		});
	}

	loadByFile({
		file
	}): Observable<
		ResponseScheme<{
			columns?: DatasetColumn[];
			data?: any[][];
		}>
	> {
		const fd = new FormData();
		fd.append('fileKey', file);
		return this.httpService.makeRequest({
			type: RequestType.POST,
			url: '/api/data-set/parse',
			payload: fd
		});
	}

	preloadSamples(): Observable<ResponseScheme<any>> {
		return this.httpService.makeRequest({
			type: RequestType.GET,
			url: '/api/dataset/'
		});
	}
}
