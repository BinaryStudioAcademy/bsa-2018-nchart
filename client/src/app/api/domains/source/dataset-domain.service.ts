import {DatasetDomain} from '@app/models';
import {HttpService} from '@app/api/http/http.service';
import {Observable} from 'rxjs/index';
import {RequestType} from '@app/models/requestType.model';
import {Injectable} from '@angular/core';

@Injectable()
export class DatasetDomainService implements DatasetDomain {
	constructor(
		private httpService: HttpService,
	){}

	loadByText({text}): Observable<any> {
		return this.httpService.makeRequest({
			type: RequestType.POST,
			url: '/api/data-set/parse',
			payload: {
				text: text
			}
		});
	}
	loadByUrl({link}): Observable<any> {
		return this.httpService.makeRequest({
			type: RequestType.POST,
			url: '/api/data-set/parse',
			payload: {
				link: link
			}
		});
	}
	loadByFile({file}): Observable<any> {
		const fd = new FormData();
		fd.append('fileKey', file);
		return this.httpService.makeRequest({
			type: RequestType.POST,
			url: '/api/data-set/parse',
			payload: fd
		});
	}

}
