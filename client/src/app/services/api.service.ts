import { Injectable } from '@angular/core';
import { User } from '../models';
import { Observable, of } from 'rxjs';

@Injectable()
export class ApiService {
	verifyToken(token): Observable<User> {
		return of({
			id: 1,
			name: 'Ben Dover',
			email: 'bendover@example.com'
		});
	}
}
