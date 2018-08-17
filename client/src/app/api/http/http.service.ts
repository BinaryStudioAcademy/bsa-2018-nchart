import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { Injectable } from '@angular/core';
import * as queryString from 'query-string';

import { RequestType } from '@app/models/requestType.model';
import config from '@app/config';

const AUTH_HEADER_NAME = 'Authorization';

@Injectable()
export class HttpService {
	static baseURL = config.baseURL;
	private _authHeader: string;

	constructor(private http: HttpClient) {}

	get authHeader(): string {
		return this._authHeader;
	}

	set authHeader(token: string) {
		this._authHeader = this.getTokenWithStrategy(token);
	}

	private getTokenWithStrategy(token: string): string {
		return `Bearer ${token}`;
	}

	makeRequest<T>(request: ServiceRequest): Observable<T> {
		debugger;
		let url = `${HttpService.baseURL}${request.url}`;
		let headers = this.prepareHeaders(request.headers);

		switch (request.type) {
			case RequestType.GET:
			case RequestType.DELETE:
				if (request.payload) {
					url = `${url}?${queryString.stringify(request.payload)}`;
				}
				return this.http[request.type]<T>(url, { headers });
			case RequestType.POST:
			case RequestType.PUT:
				headers = headers.append('Content-Type', 'application/json');

				return this.http[request.type]<T>(url, request.payload, {
					headers
				});
		}
	}

	private prepareHeaders(requestHeaders) {
		let headersConfig = {};

		if (requestHeaders) {
			headersConfig = {
				...requestHeaders
			};
		}

		let headers = new HttpHeaders(headersConfig);

		if (this.authHeader) {
			headers = headers.append(AUTH_HEADER_NAME, this.authHeader);
		}

		return headers;
	}
}
