import { Header } from '@app/api/request/header.model';

export class AuthHeader extends Header {
	constructor(value: string) {
		super('Authorization', value);
	}
}
