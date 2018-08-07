import { User } from './user.model';

export interface UserState {
	user: User | null;
	loggedIn: boolean;
	loading: boolean;
	error: string | null | Error;
}
