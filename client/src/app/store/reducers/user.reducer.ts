import { Actions as UserActions } from '@app/store/actions/user/user.actions';
import { UserActionConstants } from '@app/store/actions/user/user.action-types';
import { combineReducers } from '@ngrx/store';
import { UserState } from '@app/models/user-store.model';
import { User } from '@app/models/user.model';

export const initialState: UserState = {
	info: {
		id: null,
		name: null,
		email: null
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
			return true;

		case UserActionConstants.VERIFY_USER_TOKEN__COMPLETE:
		case UserActionConstants.VERIFY_USER_TOKEN__FAILED:
		case UserActionConstants.LOGIN__COMPLETE:
		case UserActionConstants.LOGIN__FAILED:
		case UserActionConstants.REGISTER__COMPLETE:
		case UserActionConstants.REGISTER__FAILED:
			return false;

		default:
			return state;
	}
};

export const user = combineReducers({ info, isLoading });
