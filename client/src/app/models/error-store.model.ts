import { AppAction } from '@app/models/store.model';

export interface ErrorHandlerState {
	action?: AppAction;
	msg?: string;
	serverMessages?: string[];
	error?: Error;
	isOpen?: boolean;
}
