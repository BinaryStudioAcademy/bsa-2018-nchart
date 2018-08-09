import { Actions as UserActions } from '../actions/user/user.actions';
import { UserActionConstants } from '../actions/user/user.action-types';
import { User, UserState } from '@app/models';
import { combineReducers } from '@ngrx/store';

export const initialState: UserState = {
	info: {
		id: null,
		name: null,
		email: null,
		avatar: null,
		first_name: null,
		last_name: null,
		created_at: null
	},
	isLoading: null
};

export const info = (state = initialState.info, action: UserActions): User => {
	switch (action.type) {
		case UserActionConstants.USER_VERIFY_TOKEN__COMPLETE: {
			return {
				...state,
				...action.payload
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
		case UserActionConstants.USER_VERIFY_TOKEN: {
			return true;
		}
		case UserActionConstants.USER_VERIFY_TOKEN__COMPLETE:
		case UserActionConstants.USER_VERIFY_TOKEN__FAILED: {
			return false;
		}
		default:
			return state;
	}
};

export const user = combineReducers({ info, isLoading });
