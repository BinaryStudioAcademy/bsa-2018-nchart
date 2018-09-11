import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
	projects as projectsSelector,
	projectsPagination as projectsPaginationSelector
} from '@app/store/selectors/projects.selectors.ts';
import { isProjectsLoading } from '@app/store/selectors/projects.selectors';
import { StoreService } from '@app/services/store.service';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, omitBy } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import * as queryString from 'query-string';
import { ProjectsFilter, ProjectPreview } from '@app/models/project.model';
import { OptionalType } from '@app/models';
import { PaginationData } from '@app/models/projects-store.model';
import { user as userSelector } from '@app/store/selectors/user.selectors';
import { User } from '@app/models/user.model';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
	projects$: Observable<ProjectPreview[]>;
	pagination$: Observable<PaginationData>;
	isLoading$: Observable<boolean>;
	filterParams: ProjectsFilter = {
		page: 1,
		search: ''
	};
	userEmail: string;
	disconnectStore: () => void;
	charts = null;
	owner = null;
	display = false;

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

		this.formGroup = new FormGroup({
			name: new FormControl(search, []),
			charts: new FormControl(search, []),
			owner: new FormControl(search, []),
			date: new FormControl(search, [])
		});
		this.owner = [
			{
				label: 'My projects',
				value: 'me',
				control: this.formGroup.controls['owner']
			},
			{
				label: 'Shared projects',
				value: 'shared',
				control: this.formGroup.controls['owner']
			}
		];
		this.charts = [
			{
				label: 'Pie Chart',
				value: 'Pie Chart',
				control: this.formGroup.controls['charts']
			},
			{
				label: 'Bar Chart',
				value: 'Bar Chart',
				control: this.formGroup.controls['charts']
			},
			{
				label: 'Scatter Plot',
				value: 'Scatter Plot',
				control: this.formGroup.controls['charts']
			},
			{
				label: 'Gantt Chart',
				value: 'Gantt Chart',
				control: this.formGroup.controls['charts']
			},
			{
				label: 'Map Chart',
				value: 'Map Chart',
				control: this.formGroup.controls['charts']
			},
			{
				label: 'Last Chart',
				value: 'Last Chart',
				control: this.formGroup.controls['charts']
			}
		];

		this.formGroup.get('name').valueChanges.subscribe(value => {
			this.debouncedSearch({ search: value, page: 1 });
		});

		this.disconnectStore = this.storeService.connect([
			{
				selector: userSelector(),
				subscriber: (value: User) => {
					this.userEmail = value && value.email;
				}
			}
		]);
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

	getPagination() {
		return this.pagination$;
	}

	getUserName(user: User) {
		return user && user.email === this.userEmail ? 'me' : user && user.name;
	}

	isEmptyList$() {
		return combineLatest(this.projects$, this.isLoading$).pipe(
			map(([projects, isLoading]) => {
				return !projects.length && !isLoading;
			})
		);
	}

	ngAfterViewInit() {
		// const paginatorControl = document.getElementsByClassName(
		// 	'ui-paginator-icon'
		// );
		// paginatorControl[0].setAttribute(
		// 	'class',
		// 	'ui-paginator-icon fa fa-backward'
		// );
		// paginatorControl[3].setAttribute(
		// 	'class',
		// 	'ui-paginator-icon fa fa-forward'
		// );
	}
}
