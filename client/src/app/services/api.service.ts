import { Injectable } from '@angular/core';
import { User } from '../models';
import { Observable, of } from 'rxjs';
import { Company, Project } from '@app/models';

@Injectable()
export class ApiService {
	verifyToken(token): Observable<User> {
		return of({
			id: 1,
			name: 'Ben Dover',
			email: 'bendover@example.com'
		});
	}

	loadProjects(): Observable<Array<Project>> {
		return of([
			{
				id: 'q1',
				name: 'binary',
				created_at: '12345678'
			},
			{
				id: 'q2',
				name: 'macpaw',
				created_at: '995678'
			},
			{
				id: 'q3',
				name: 'kpi',
				created_at: '1'
			}
		]);
	}

	loadCompanies(): Observable<Array<Company>> {
		return of([
			{
				id: 'q1',
				name: 'binary',
				created_at: '12345678'
			},
			{
				id: 'q2',
				name: 'macpaw',
				created_at: '995678'
			},
			{
				id: 'q3',
				name: 'kpi',
				created_at: '1'
			}
		]);
	}
}
