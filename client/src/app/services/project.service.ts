import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { of, Subject } from 'rxjs';
import { Project } from '@app/models/project.model';

@Injectable()
export class ProjectService {
	static DRAFT_NAME = 'Project name';
	private saveSubject = new Subject<any>();
	saveObservable = this.saveSubject.asObservable();

	saveProject() {
		this.saveSubject.next(true);
	}

	createDraftProject() {
		const project = new Project();

		project.id = v4();
		project.isDraft = true;
		project.name = ProjectService.DRAFT_NAME;

		return of(project);
	}
}
