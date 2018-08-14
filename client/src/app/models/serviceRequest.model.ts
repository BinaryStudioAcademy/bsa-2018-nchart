import { HttpHeaders } from '@angular/common/http';
import { RequestType } from '@app/models/requestType.model';

export class ServiceRequest {
	constructor(
		public readonly type: RequestType,
		public readonly url: string,
		public readonly headers?: HttpHeaders,
		public readonly payload?: any
	) {}
}
