import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
	private static tokenStorageKey = 'userToken';
	constructor() {}

	setToken(token: string) {
		localStorage.setItem(TokenService.tokenStorageKey, token);
	}

	getToken(): string {
		return localStorage.getItem(TokenService.tokenStorageKey);
	}

	removeToken() {
		localStorage.removeItem(TokenService.tokenStorageKey);
	}
}
