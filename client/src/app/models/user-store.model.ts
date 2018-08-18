import { User } from './user.model';

export interface UserState {
	info: User;
	isLoading: boolean;
}
