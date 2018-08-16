import {Injectable} from '@angular/core';
import {HttpService} from '@app/api/http/http.service';
import {RequestType} from '@app/models/requestType.model';
import {Observable} from 'rxjs/index';

@Injectable()
export class SourceService {

	constructor(
		private httpService: HttpService,
	) {}

	loadSource({link = null, text= null, fileKey = null}): Observable<any> {
		if (!!link) {
			return this.httpService.makeRequest({
				type: RequestType.POST,
				url: '/api/data-set/parse',
				payload: {
					"link": link
				}
			});
		}
		if (!!text) {
			return this.httpService.makeRequest({
				type: RequestType.POST,
				url: '/api/data-set/parse',
				payload: {
					"text": text
				}
			});
		}
		if (!!fileKey) {
			const fd = new FormData();
			fd.append('fileKey', fileKey);
			return this.httpService.makeRequest({
				type: RequestType.POST,
				url: '/api/data-set/parse',
				payload: fd
			});
		}
	}
}
