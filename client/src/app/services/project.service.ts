import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { of } from 'rxjs';
import { Project } from '@app/models/project.model';
import { ProjectComponent } from '@app/core/project/project.component';

@Injectable()
export class ProjectService {
	static DRAFT_NAME = 'Project name';
	ptojectName: string;

	createDraftProject() {
		const project = new Project();

		project.id = v4();
		project.isDraft = true;
		project.name = ProjectService.DRAFT_NAME;

		return of(project);
	}

	changeProjectName() {
		// const project = new Project();

		const name = this.ptojectName;

		return of(name);
	}
}
