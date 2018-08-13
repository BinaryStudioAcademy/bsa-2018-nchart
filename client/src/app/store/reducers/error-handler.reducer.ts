import { ErrorHandlerState, FailedAction } from '@app/models';

export const initialState: ErrorHandlerState = {
	action: null,
	msg: null,
	serverMessages: null,
	error: null,
	isOpen: null
};

export const errorHandlerReducer = (
	state = initialState,
	action: FailedAction
): ErrorHandlerState => {
	if (action) {
		if (endsWith(action.type, '_FAILED')) {
			return {
				...state,
				action: action.payload.action,
				msg: action.payload.msg,
				serverMessages: action.payload.serverMessages,
				error: action.payload.error,
				isOpen: true
			};
		}
	}
	return state;
};

function endsWith(str, temp) {
	const index = str.indexOf(temp);
	return index !== -1 && index + temp.length === str.length && true;
}
