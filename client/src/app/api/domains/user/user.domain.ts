import {
	UserDomain,
	ResponseScheme,
	Register,
	Login,
	User,
	AuthenticatedUser
} from '@app/models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '@app/api/http/http.service';
import { ServiceRequest } from '@app/models/serviceRequest.model';
import { RequestType } from '@app/models/requestType.model';
import { tap } from 'rxjs/operators';
import { TokenService } from '@app/services/token.service';

@Injectable()
export class UserDomainService implements UserDomain {
	private userPath = '/api/user';
	constructor(
		private httpService: HttpService,
		private tokenService: TokenService
	) {}

	register(payload: {
		user: Register;
	}): Observable<ResponseScheme<AuthenticatedUser>> {
		return this.httpService
			.makeRequest<ResponseScheme<AuthenticatedUser>>(
				new ServiceRequest(
					RequestType.POST,
					`${this.userPath}/register`,
					null,
					payload
				)
			)
			.pipe(
				tap(response => {
					this.httpService.authHeader = response.payload.token;
					this.tokenService.setToken(response.payload.token);
				})
			);
	}

	login(payload: Login): Observable<ResponseScheme<AuthenticatedUser>> {
		return this.httpService
			.makeRequest<ResponseScheme<AuthenticatedUser>>(
				new ServiceRequest(
					RequestType.POST,
					`${this.userPath}/login`,
					null,
					payload
				)
			)
			.pipe(
				tap(response => {
					this.httpService.authHeader = response.payload.token;
					this.tokenService.setToken(response.payload.token);
				})
			);
	}

	update(
		payload: { password: string } & User
	): Observable<ResponseScheme<null>> {
		return this.httpService.makeRequest<ResponseScheme<null>>(
			new ServiceRequest(
				RequestType.PUT,
				`${this.userPath}/${payload.id}`,
				null,
				payload
			)
		);
	}

	delete(payload: { id: string }): Observable<ResponseScheme<null>> {
		return this.httpService.makeRequest<ResponseScheme<null>>(
			new ServiceRequest(
				RequestType.DELETE,
				`${this.userPath}/${payload.id}`,
				null,
				payload
			)
		);
	}

	get(payload: { id: string }): Observable<ResponseScheme<User>> {
		return this.httpService.makeRequest<ResponseScheme<User>>(
			new ServiceRequest(
				RequestType.GET,
				`${this.userPath}/${payload.id}`
			)
		);
	}

	getAll(): Observable<ResponseScheme<User[]>> {
		return this.httpService.makeRequest<ResponseScheme<User[]>>(
			new ServiceRequest(RequestType.GET, this.userPath)
		);
	}

	verifyToken(payload: { token: string }): Observable<ResponseScheme<User>> {
		return this.httpService
			.makeRequest<ResponseScheme<User>>(
				new ServiceRequest(
					RequestType.POST,
					`${this.userPath}/verifyToken`,
					null,
					payload
				)
			)
			.pipe(
				tap(() => {
					this.httpService.authHeader = payload.token;
					this.tokenService.setToken(payload.token);
				})
			);
	}
}
