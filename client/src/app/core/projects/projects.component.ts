import {
	Component,
	OnInit,
	AfterViewInit,
	ChangeDetectionStrategy
} from '@angular/core';
import {
	projects as projectsSelector,
	projectsPagination as projectsPaginationSelector
} from '@app/store/selectors/projects.selectors';
import { isProjectsLoading } from '@app/store/selectors/projects.selectors';
import { StoreService } from '@app/services/store.service';
import * as projectActions from '@app/store/actions/projects/projects.actions';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { debounce, omitBy } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import * as queryString from 'query-string';
import { ProjectsFilter, ProjectPreview } from '@app/models/project.model';
import { OptionalType } from '@app/models';
import { PaginationData } from '@app/models/projects-store.model';
import { user as userSelector } from '@app/store/selectors/user.selectors';
import { User } from '@app/models/user.model';
import { SelectItem } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, AfterViewInit {
	projects$: Observable<ProjectPreview[]>;
	pagination$: Observable<PaginationData>;
	isLoading$: Observable<boolean>;
	filterParams: ProjectsFilter = {
		page: 1,
		title: ''
	};
	datePicked: Date[] = [];
	userEmail: string;
	disconnectStore: () => void;
	owner = null;
	display = false;
	charts: SelectItem[] = [
		{
			label: 'Pie Chart',
			value: 'pieChart'
		},
		{
			label: 'Bar Chart',
			value: 'barChart'
		},
		{
			label: 'Scatter Plot',
			value: 'scatterplot'
		},
		{
			label: 'Gantt Chart',
			value: 'ganttChart'
		},
		{
			label: 'Map Chart',
			value: 'mapChart'
		},
		{
			label: 'Alluvial Diagram',
			value: 'alluvialDiagram'
		}
	];
	debouncedSearch: (params: OptionalType<ProjectsFilter>) => void;

	constructor(
		private storeService: StoreService,
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {
		this.debouncedSearch = debounce(this.applyFilter, 500);
	}

	// filterForm: FormGroup;

	newFilterGroup: FormGroup;

	ngOnInit() {
		const {
			page,
			title,
			charts,
			owner,
			from,
			to
		} = this.route.snapshot.queryParams;
		this.newFilterGroup = this.fb.group({
			title: [title],
			charts: [charts ? charts.split(',') : null],
			owner: [owner],
			date: [[from, to]]
		});
		if (!page) {
			this.applyFilter(this.filterParams);
		}

		this.route.queryParams.subscribe(params => {
			this.storeService.dispatch(
				new projectActions.LoadProjetcsInfo({
					page: params.page || 1,
					title: params.title,
					charts: params.charts ? params.charts.split(',') : null,
					owner: params.owner,
					from: params.from,
					to: params.to
				})
			);
			this.setFilter({
				...params,
				page: params.page || 1
			});
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

		this.owner = [
			{
				label: 'My projects',
				value: 'me',
				control: this.newFilterGroup.get('owner')
			},
			{
				label: 'Shared projects',
				value: 'shared',
				control: this.newFilterGroup.get('owner')
			}
		];

		this.newFilterGroup.valueChanges.subscribe(v => {
			this.debouncedSearch({
				title: v.title,
				charts: v.charts.length ? v.charts.join(',') : '',
				owner: v.owner,
				from: v.date[0] ? moment(v.date[0]).format('YYYY-MM-DD') : null,
				to: v.date[1] ? moment(v.date[1]).format('YYYY-MM-DD') : null
			});
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
		this.newFilterGroup.controls.page.patchValue(page);
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

	hide() {
		this.display = false;
	}

	ngAfterViewInit() {}
}
