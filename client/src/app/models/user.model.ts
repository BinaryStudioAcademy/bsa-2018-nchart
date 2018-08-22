import { SchemeID } from '@app/models/normalizr.model';

export interface User {
	id: SchemeID;
	name: string;
	email: string;
}

export interface AuthenticatedUser {
	token: string;
	user: User;
}
