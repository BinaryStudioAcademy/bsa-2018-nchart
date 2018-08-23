import { Actions as UserActions } from '@app/store/actions/user/user.actions';
import { UserActionConstants } from '@app/store/actions/user/user.action-types';
import { User, UserState } from '@app/models';
import { combineReducers } from '@ngrx/store';

export const initialState: UserState = {
	info: {
		id: null,
		name: null,
		email: null,
		defaultGroupId: null
	},
	isLoading: null
};

export const info = (state = initialState.info, action: UserActions): User => {
	switch (action.type) {
		case UserActionConstants.VERIFY_USER_TOKEN__COMPLETE:
		case UserActionConstants.LOGIN__COMPLETE:
		case UserActionConstants.REGISTER__COMPLETE: {
			return {
				...state,
				...action.payload.user
			};
		}
		case UserActionConstants.LOGOUT__COMPLETE: {
			return {
				...state,
				id: null,
				name: null,
				email: null
			};
		}
		default:
			return state;
	}
};

export const isLoading = (
	state = initialState.isLoading,
	action: UserActions
): boolean => {
	switch (action.type) {
		case UserActionConstants.VERIFY_USER_TOKEN:
		case UserActionConstants.LOGIN:
		case UserActionConstants.REGISTER:
		case UserActionConstants.LOGOUT:
			return true;

		case UserActionConstants.VERIFY_USER_TOKEN__COMPLETE:
		case UserActionConstants.VERIFY_USER_TOKEN__FAILED:
		case UserActionConstants.LOGIN__COMPLETE:
		case UserActionConstants.LOGIN__FAILED:
		case UserActionConstants.REGISTER__COMPLETE:
		case UserActionConstants.REGISTER__FAILED:
		case UserActionConstants.LOGOUT__COMPLETE:
		case UserActionConstants.LOGOUT__FAILED:
			return false;

		default:
			return state;
	}
};

export const user = combineReducers({ info, isLoading });
