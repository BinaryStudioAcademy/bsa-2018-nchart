import { HttpHeaders } from '@angular/common/http';
import { RequestType } from '@app/api/request/requestType.model';

export class ServiceRequest {
	public readonly type: RequestType;
	public readonly payload: any;
	public readonly url: string;
	public readonly headers: HttpHeaders;

	constructor(
		type: RequestType,
		url: string,
		headers?: HttpHeaders,
		payload?: any
	) {
		this.type = type;
		this.url = url;
		this.headers = headers ? headers : new HttpHeaders();
		this.payload = payload ? payload : null;
	}
}
