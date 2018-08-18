import { UserActionConstants } from './user.action-types';
import { AppAction, FailedAction, User } from '@app/models';

export class VerifyToken extends AppAction<{ token }> {
	readonly type = UserActionConstants.VERIFY_USER_TOKEN;
}

export class VerifyTokenComplete extends AppAction<User> {
	readonly type = UserActionConstants.VERIFY_USER_TOKEN__COMPLETE;
}

export class VerifyTokenFailed extends FailedAction {
	readonly type = UserActionConstants.VERIFY_USER_TOKEN__FAILED;
}

export type Actions = VerifyToken | VerifyTokenComplete | VerifyTokenFailed;
