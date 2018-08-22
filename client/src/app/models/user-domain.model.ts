import { Observable } from 'rxjs';
import { AuthenticatedUser, User } from '@app/models/user.model';
import { Register } from '@app/models/register.model';
import { ResponseScheme } from '@app/models/response-scheme.model';
import { Login } from '@app/models/login.model';

export interface UserDomain {
	register(payload: {
		user: Register;
	}): Observable<ResponseScheme<AuthenticatedUser>>;
	login(payload: Login): Observable<ResponseScheme<AuthenticatedUser>>;
	update(
		payload: { password: string } & User
	): Observable<ResponseScheme<User>>;
	delete(payload: { id: string }): Observable<ResponseScheme<null>>;
	get(payload: { id: string }): Observable<ResponseScheme<User>>;
	getAll(): Observable<ResponseScheme<User[]>>;
	verifyToken(payload: { token: string }): Observable<ResponseScheme<User>>;
}
