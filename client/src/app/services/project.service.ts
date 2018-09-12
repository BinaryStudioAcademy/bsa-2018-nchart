import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { of } from 'rxjs';
import { Project, ProjectFilterForm } from '@app/models/project.model';
import { FormService } from '@app/services/form.service';
import { FormBuilder } from '@angular/forms';

@Injectable()
export class ProjectService {
	constructor(
		private formService: FormService,
		private formBuilder: FormBuilder
	) {}

	static DRAFT_NAME = 'Project name';

	createDraftProject() {
		const project = new Project();

		project.id = v4();
		project.isDraft = true;
		project.name = ProjectService.DRAFT_NAME;

		return of(project);
	}

	createFilteringForm({
		title,
		charts,
		owner,
		page,
		date
	}: ProjectFilterForm) {
		return this.formBuilder.group(
			this.formService.createFormControls(
				{
					page,
					title,
					charts,
					owner,
					date
				},
				{}
			)
		);
	}
}
