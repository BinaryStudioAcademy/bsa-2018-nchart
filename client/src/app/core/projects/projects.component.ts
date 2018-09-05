import {Component, OnInit} from '@angular/core';
import {projects as projectsSelector} from '@app/store/selectors/projects.selectors.ts';
import {StoreService} from '@app/services/store.service';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import {Observable} from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
// import {emailValidator, requiredValidator} from '@app/shared/components/form-field/form-validators';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
	projects$: Observable<any>;

	constructor(private storeService: StoreService) {
	}
	formGroup: FormGroup;
	ngOnInit() {
		this.projects$ = this.storeService.createSubscription(
			projectsSelector()
		);
		// test
		// this.storeService.dispatch(new projectActions.LoadProjetcsInfo({page:1,name:'group'}));
		this.storeService.dispatch(new projectActions.LoadProjetcsInfo({page: 1}));

		this.formGroup = new FormGroup({
			name: new FormControl('', []),
		});
	}

	getProjects() {
		return this.projects$;
	}
}
