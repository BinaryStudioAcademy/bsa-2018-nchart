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
import { Observable, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { debounce, omitBy } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import * as queryString from 'query-string';
import {
	ProjectsFilter,
	ProjectPreview,
	ProjectOwnershipFilter
} from '@app/models/project.model';
import { OptionalType } from '@app/models';
import { PaginationData } from '@app/models/projects-store.model';
import { user as userSelector } from '@app/store/selectors/user.selectors';
import { User } from '@app/models/user.model';
import { SelectItem } from 'primeng/api';
import * as moment from 'moment';
import { ProjectService } from '@app/services/project.service';
import { OnDestroy } from '@angular/core';
import { withLatestFrom } from 'rxjs/internal/operators';
import * as deepEqual from 'fast-deep-equal';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
	projects$: Observable<ProjectPreview[]>;
	pagination$: Observable<PaginationData>;
	isLoading$: Observable<boolean>;
	formChangesSub: Subscription;
	userEmail: string;
	usedParams: OptionalType<ProjectsFilter>;
	disconnectStore: () => void;
	display = false;
	projectOwnershipEnum = ProjectOwnershipFilter;
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
	debouncedFiltering: (params: OptionalType<ProjectsFilter>) => void;

	constructor(
		private storeService: StoreService,
		private router: Router,
		private route: ActivatedRoute,
		private projectService: ProjectService
	) {
		this.debouncedFiltering = debounce(this.applyFilter, 500);
	}

	filteringForm: FormGroup;

	ngOnInit() {
		const { queryParams } = this.route.snapshot;

		this.projects$ = this.storeService.createSubscription(
			projectsSelector()
		);
		this.pagination$ = this.storeService.createSubscription(
			projectsPaginationSelector()
		);

		this.isLoading$ = this.storeService.createSubscription(
			isProjectsLoading()
		);

		this.disconnectStore = this.storeService.connect([
			{
				selector: userSelector(),
				subscriber: (value: User) => {
					this.userEmail = value && value.email;
				}
			}
		]);


		this.filteringForm = this.projectService.createFilteringForm(
			this.filterParamsForForm(queryParams as ProjectsFilter)
		);

		this.formChangesSub = this.filteringForm.valueChanges
			.pipe(withLatestFrom(this.route.queryParams))
			.subscribe(([v]) => {
				// TODO: implement reset filters when search changed
				this.debouncedFiltering(this.filterParamsForQuery(v));
			});

		this.route.queryParams.subscribe(params => {
			console.log(this.filtersToUse(params), this.usedParams);
			if (!deepEqual(this.usedParams, this.filtersToUse(params))) {
				this.storeService.dispatch(
					new projectActions.LoadProjetcsInfo({
						page: params.page || 1,
						title: params.title,
						charts: params.charts,
						owner: params.owner || this.projectOwnershipEnum.all,
						from: params.from,
						to: params.to
					})
				);

				this.filteringForm.setValue(
					this.filterParamsForForm(params as ProjectsFilter)
				);

				this.usedParams = this.filtersToUse(params);
			}
		});
	}

	onNewPage(page) {
		this.filteringForm.get('page').patchValue(page);
		this.applyFilter({ page });
	}

	applyFilter(params: OptionalType<ProjectsFilter>) {
		const actualFilters = this.filtersToUse(params);

		const query = queryString.stringify(actualFilters);
		this.router.navigateByUrl(`/app/projects?${query}`);
	}

	filtersToUse(params) {
		return omitBy(params, value => !value);
	}

	filterParamsForQuery(formValues): ProjectsFilter {
		const { title, charts, owner, date, page } = formValues;

		return {
			title: title || '',
			charts: this.chartsForQuery(charts),
			owner: this.ownerForQuery(owner),
			from: this.dateForQuery(date[0]),
			to: this.dateForQuery(date[1]),
			page: page || 1
		};
	}

	filterParamsForForm({
		title,
		charts,
		owner,
		from,
		to,
		page
	}: ProjectsFilter) {
		return {
			title: title || '',
			charts: this.chartsForForm(charts),
			owner: this.ownerForForm(owner),
			date: [from, to],
			page: page || 1
		};
	}

	ownerForQuery(owner) {
		return owner && owner.every(el => this.projectOwnershipEnum[el])
			? owner.length === 2
				? this.projectOwnershipEnum.all
				: owner[0]
			: this.projectOwnershipEnum.all;
	}

	ownerForForm(owner) {
		const { all, me, shared } = this.projectOwnershipEnum;

		return owner
			? owner === all
				? [me, shared]
				: owner === me || owner === shared
					? [owner]
					: null
			: null;
	}

	dateForQuery(date) {
		return date ? moment(date).format('YYYY-MM-DD') : null;
	}

	chartsForQuery(charts) {
		return charts && charts.length ? charts.join(',') : null;
	}

	chartsForForm(charts) {
		return charts ? charts.split(',').filter(el => !!el) : [];
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

	ngOnDestroy() {
		this.formChangesSub.unsubscribe();
		this.disconnectStore();
	}

	hide() {
		this.display = false;
	}

	ngAfterViewInit() {}
}
