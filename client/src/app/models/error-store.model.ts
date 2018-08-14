import { AppAction } from './store.model';

export interface ErrorHandlerState {
	action?: AppAction;
	msg?: string;
	serverMessages?: string[];
	error?: Error;
	isOpen?: boolean;
}
