import { Observable } from 'rxjs';
import { ResponseScheme, Login, User, Register } from '@app/models';
import { AuthenticatedUser } from '@app/models/user.model';

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
