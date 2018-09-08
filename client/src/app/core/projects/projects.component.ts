import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
	projects as projectsSelector,
	projectsPagination as projectsPaginationSelector
} from '@app/store/selectors/projects.selectors.ts';
import { isProjectsLoading } from '@app/store/selectors/projects.selectors';
import { StoreService } from '@app/services/store.service';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, omitBy } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import * as queryString from 'query-string';
import { ProjectsFilter } from '@app/models/project.model';
import { OptionalType } from '@app/models';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
	searchLabel = 'Project name';
	projects$: Observable<any>;
	pagination$: Observable<any>;
	isLoading$: Observable<any>;
	filterParams: ProjectsFilter = {
		page: 1,
		search: ''
	};

	debouncedSearch: (params: OptionalType<ProjectsFilter>) => void;

	constructor(
		private storeService: StoreService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.debouncedSearch = debounce(this.applyFilter, 500);
	}

	formGroup: FormGroup;
	ngOnInit() {
		const { page, search } = this.route.snapshot.queryParams;

		if (!page) {
			this.applyFilter(this.filterParams);
		}

		this.route.queryParams.subscribe(params => {
			this.storeService.dispatch(
				new projectActions.LoadProjetcsInfo({
					page: params.page,
					name: params.search
				})
			);
			this.setFilter(params);
		});
		this.projects$ = this.storeService.createSubscription(
			projectsSelector()
		);
		this.pagination$ = this.storeService.createSubscription(
			projectsPaginationSelector()
		);

		this.isLoading$ = this.storeService.createSubscription(
			isProjectsLoading()
		);
		/* // test
		// this.storeService.dispatch(new projectActions.LoadProjetcsInfo({page:1,name:'group'}));
		this.storeService.dispatch(new projectActions.LoadProjetcsInfo({page: 1}));
		*/
		this.formGroup = new FormGroup({
			name: new FormControl(search, [])
		});

		this.formGroup.get('name').valueChanges.subscribe(value => {
			this.debouncedSearch({ search: value, page: 1 });
		});
	}

	onNewPage(page) {
		this.applyFilter({ page });
	}

	applyFilter(params: OptionalType<ProjectsFilter>) {
		if (params) {
			this.setFilter(params);
		}
		const actualFilters = omitBy(this.filterParams, value => !value);

		const query = queryString.stringify(actualFilters);
		this.router.navigateByUrl(`/app/projects?${query}`);
	}

	setFilter(params: OptionalType<ProjectsFilter>) {
		this.filterParams = {
			...this.filterParams,
			...params
		};
	}

	getProjects() {
		return this.projects$;
	}

	getPagination(){
		return this.pagination$;
	}

	getLoadingStatus(){
		return this.isLoading$;
	}

	ngAfterViewInit(){
		const paginatorControl = document.getElementsByClassName("ui-paginator-icon");
		paginatorControl[0]
			.setAttribute('class', 'ui-paginator-icon fa fa-backward');
		paginatorControl[3]
			.setAttribute('class', 'ui-paginator-icon fa fa-forward');
	}
}
