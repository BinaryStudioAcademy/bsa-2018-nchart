import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ExportDashboardBusService {
	private responseSubject = new Subject<any>();
	responseObservable = this.responseSubject.asObservable();

	sendDashboard(element: string): void {
		this.responseSubject.next(element);
	}
}
