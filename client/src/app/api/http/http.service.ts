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
		let url = `${HttpService.baseURL}${request.url}`;
		const headers = this.prepareHeaders(request.headers);

		switch (request.type) {
			case RequestType.GET:
			case RequestType.DELETE:
				if (request.payload) {
					url = `${url}?${queryString.stringify(request.payload)}`;
				}
				return this.http[request.type]<T>(url, { headers });
			case RequestType.POST:
			case RequestType.PUT:
				return this.http[request.type]<T>(url, request.payload, {
					headers
				});
		}
	}

	makeFileRequest(request: ServiceRequest): Observable<Blob> {
		let url = `${HttpService.baseURL}${request.url}`;
		const headers = this.prepareHeaders(request.headers);

		if (request.payload) {
			url = `${url}?${queryString.stringify(request.payload)}`;
		}

		return this.http.get(url, { headers, responseType: 'blob' });
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
