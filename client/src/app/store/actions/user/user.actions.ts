import { User } from '../../../models';
import { AppAction } from '../../../models';
import { UserActionConstants } from './user.action-types';

export class VerifyToken extends AppAction<{ token }> {
	readonly type = UserActionConstants.VERIFY_TOKEN;
}

export class VerifyTokenComplete extends AppAction<User> {
	readonly type = UserActionConstants.VERIFY_TOKEN_COMPLETE;
}

export class VerifyTokenFailed extends AppAction<{ error: Error | string }> {
	readonly type = UserActionConstants.VERIFY_TOKEN__FAILED;
}

export type Actions = VerifyToken | VerifyTokenComplete | VerifyTokenFailed;
