import { UserState } from './user-store.model';

export class AppAction<T = undefined> {
	readonly type: string;
	constructor(public payload?: T) {}
}

export interface AppState {
	userState: UserState;
}
