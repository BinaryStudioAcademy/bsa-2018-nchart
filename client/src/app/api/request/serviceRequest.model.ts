import { HttpHeaders } from '@angular/common/http';

export class ServiceRequest {
	constructor(
		public type: RequestType,
		public url: string,
		public payload?: any,
		public headers?: HttpHeaders
	) {}
}
