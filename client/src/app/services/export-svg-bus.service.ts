import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ExportSvgBusService {
	private requestSubject = new Subject<any>();
	private responseSubject = new Subject<any>();

	requestObservable = this.requestSubject.asObservable();
	responseObservable = this.responseSubject.asObservable();

	requestSvg() {
		this.requestSubject.next();
	}

	sendSvg(svg: string): void {
		this.responseSubject.next(svg);
	}
}
