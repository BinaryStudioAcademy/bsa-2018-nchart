import { AppAction } from './store.model';

export interface ErrorHandlerState {
	action?: AppAction | null;
	msg?: string;
	serverMessages?: string[];
	error?: Error;
	isOpen?: boolean;
}
