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
		firstName: null,
		lastName: null,
		createdAt: null
	},
	isLoading: null
};

export const info = (state = initialState.info, action: UserActions): User => {
	switch (action.type) {
		case UserActionConstants.VERIFY_USER_TOKEN__COMPLETE: {
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
		case UserActionConstants.VERIFY_USER_TOKEN: {
			return true;
		}
		case UserActionConstants.VERIFY_USER_TOKEN__COMPLETE:
		case UserActionConstants.VERIFY_USER_TOKEN__FAILED: {
			return false;
		}
		default:
			return state;
	}
};

export const user = combineReducers({ info, isLoading });
