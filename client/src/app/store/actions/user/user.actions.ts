import { UserActionConstants } from '@app/store/actions/user/user.action-types';
import { AppAction, FailedAction } from '@app/models/store.model';
import { User } from '@app/models/user.model';
import { Login as LoginModel } from '@app/models/login.model';
import { Register as RegisterModel } from '@app/models/register.model';

export class VerifyToken extends AppAction<{ token }> {
	readonly type = UserActionConstants.VERIFY_USER_TOKEN;
}

export class VerifyTokenComplete extends AppAction<{ user: User }> {
	readonly type = UserActionConstants.VERIFY_USER_TOKEN__COMPLETE;
}

export class VerifyTokenFailed extends FailedAction {
	readonly type = UserActionConstants.VERIFY_USER_TOKEN__FAILED;
}

export class Login extends AppAction<{ user: LoginModel }> {
	readonly type = UserActionConstants.LOGIN;
}

export class LoginComplete extends AppAction<{ user: User }> {
	readonly type = UserActionConstants.LOGIN__COMPLETE;
}

export class LoginFailed extends FailedAction {
	readonly type = UserActionConstants.LOGIN__FAILED;
}

export class Register extends AppAction<{ user: RegisterModel }> {
	readonly type = UserActionConstants.REGISTER;
}

export class RegisterComplete extends AppAction<{ user: User }> {
	readonly type = UserActionConstants.REGISTER__COMPLETE;
}

export class RegisterFailed extends FailedAction {
	readonly type = UserActionConstants.REGISTER__FAILED;
}

export class Logout extends AppAction {
	readonly type = UserActionConstants.LOGOUT;
}

export class LogoutComplete extends AppAction {
	readonly type = UserActionConstants.LOGOUT__COMPLETE;
}

export class LogoutFailed extends FailedAction {
	readonly type = UserActionConstants.LOGOUT__FAILED;
}

export type Actions =
	| VerifyToken
	| VerifyTokenComplete
	| VerifyTokenFailed
	| Login
	| LoginComplete
	| LoginFailed
	| Register
	| RegisterComplete
	| RegisterFailed
	| Logout
	| LogoutComplete
	| LogoutFailed;
