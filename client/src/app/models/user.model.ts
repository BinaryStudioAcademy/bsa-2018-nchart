import { SchemeID } from '@app/models/normalizr.model';

export interface User {
	id: SchemeID;
	name: string;
	email: string;
	token: string;
}
