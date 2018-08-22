import { RequestType } from '@app/models/requestType.model';

export class ServiceRequest {
	constructor(
		public readonly type: RequestType,
		public readonly url: string,
		public readonly headers?: {
			[key: string]: string;
		},
		public readonly payload?: any
	) {}
}
