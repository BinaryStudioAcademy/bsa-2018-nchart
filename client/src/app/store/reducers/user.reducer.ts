import { Actions } from '../actions/user/user.actions';
import { UserActionConstants } from '../actions/user/user.action-types';
import { UserState } from '@app/models';

export const initialState: UserState = {
	user: null,
	loggedIn: false,
	loading: false,
	error: null
};

export const user = (state = initialState, action: Actions): UserState => {
	switch (action.type) {
		case UserActionConstants.VERIFY_TOKEN: {
			return {
				...state,
				loading: true
			};
		}
		case UserActionConstants.VERIFY_TOKEN_COMPLETE: {
			return {
				...state,
				user: action.payload,
				loading: false
			};
		}
		case UserActionConstants.VERIFY_TOKEN__FAILED: {
			return {
				...state,
				loading: false,
				error: action.payload.error
			};
		}
		default:
			return state;
	}
};
