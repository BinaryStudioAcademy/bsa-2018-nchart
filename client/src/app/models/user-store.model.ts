import { User } from '@app/models/user.model';

export interface UserState {
	info: User;
	isLoading: boolean;
}
