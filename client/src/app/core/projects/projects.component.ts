import {Component, OnInit, AfterViewInit} from '@angular/core';
import {
	projects as projectsSelector,
	projectsPagination as projectsPaginationSelector
} from '@app/store/selectors/projects.selectors.ts';
import {isProjectsLoading} from '@app/store/selectors/projects.selectors';
import {StoreService} from '@app/services/store.service';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import {Observable, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {debounce, omitBy} from 'lodash';
import {Router, ActivatedRoute} from '@angular/router';
import * as queryString from 'query-string';
import {ProjectsFilter, ProjectPreview} from '@app/models/project.model';
import {OptionalType} from '@app/models';
import {PaginationData} from '@app/models/projects-store.model';
import {user as userSelector} from '@app/store/selectors/user.selectors';
import {User} from '@app/models/user.model';
import {SelectItem} from 'primeng/api';
import { FormBuilder } from '@angular/forms';

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
		title: ''
	};
	userEmail: string;
	disconnectStore: () => void;
	owner = null;
	display = false;
	charts: SelectItem[] = [
		{
			label: 'Pie Chart',
			value: 'Pie Chart'
		},
		{
			label: 'Bar Chart',
			value: 'Bar Chart'
		},
		{
			label: 'Scatter Plot',
			value: 'Scatter Plot'
		},
		{
			label: 'Gantt Chart',
			value: 'Gantt Chart'
		},
		{
			label: 'Map Chart',
			value: 'Map Chart'
		},
		{
			label: 'Last Chart',
			value: 'Last Chart'
		}
	];

	debouncedSearch: (params: OptionalType<ProjectsFilter>) => void;

	constructor(private storeService: StoreService,
				private router: Router,
				private route: ActivatedRoute,
				private fb: FormBuilder) {
		this.debouncedSearch = debounce(this.applyFilter, 500);
	}

	filterForm: FormGroup;

	newFilterGroup = this.fb.group({
		page: [''],
		title: [''],
		chart: [''],
		owner: [''],
		from: [''],
		to: ['']
	});

	ngOnInit() {
		const {
			page,
			title,
			chart,
			owner,
			from,
			to
		} = this.route.snapshot.queryParams;

		if (!page) {
			this.applyFilter(this.filterParams);
		}

		this.route.queryParams.subscribe(params => {
			this.storeService.dispatch(
				new projectActions.LoadProjetcsInfo({
					page: params.page,
					title: params.title
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

		this.filterForm = new FormGroup({
			title: new FormControl(title),
			owner: new FormControl(owner),
			from: new FormControl(from),
			to: new FormControl(to),
		});

		this.owner = [
			{
				label: 'My projects',
				value: 'me',
				control: this.filterForm.get('owner')
			},
			{
				label: 'Shared projects',
				value: 'shared',
				control: this.filterForm.get('owner')
			}
		];

		this.filterForm.get('title').valueChanges.subscribe(value => {
			this.debouncedSearch({title: value, page: 1});
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
		// console.log(this.filterForm.value);
		console.log(this.newFilterGroup.value);
		this.applyFilter({page});
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
