import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthHeader } from '@app/api/request/authHeader.model';
import { ServiceRequest } from '@app/api/request/serviceRequest.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
	private internalAuthHeader: AuthHeader;

	constructor(private http: HttpClient) {}

	get authHeader(): AuthHeader {
		return this.internalAuthHeader;
	}

	set authHeader(newHeader: AuthHeader) {
		this.internalAuthHeader = newHeader;
	}

	makeRequest(request: ServiceRequest): Observable<any> {
		const { type, url, payload, headers } = request;
		(<HttpHeaders>headers).append(
			this.authHeader.name,
			this.authHeader.value
		);

		return this.http.request(type, url, {
			body: payload,
			headers
		});
	}
}
