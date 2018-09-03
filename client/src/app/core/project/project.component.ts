import {
	Component,
	OnInit,
	OnDestroy,
	ElementRef,
	QueryList,
	HostListener,
	AfterViewInit,
	ViewChildren
} from '@angular/core';
import { StoreService } from '@app/services/store.service';
import {
	CreateDraftProject,
	LoadOneProject
} from '@app/store/actions/projects/projects.actions';
import { isProjectDataset } from '@app/store/selectors/projects.selectors';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import * as ProjectsActions from '@app/store/actions/projects/projects.actions';
import {project} from '@app/store/selectors/projects.selectors';
import {SchemeID} from '@app/models/normalizr.model';
import {isRequiredDimensionMatched} from '@app/store/selectors/userCharts';
import {isChartsReady} from '@app/store/selectors/charts.selectors';
import {isActiveChartDataset} from '@app/store/selectors/dataset.selectors';

interface StepperStep {
	id: number;
	scrollTo: string;
	name: string;
}

export interface ComponentCanDeactivate {
	canDeactivate: () => boolean | Observable<boolean>;
}

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {
	showCharts = false;
	showTable = false;
	isChartsReady = false;
	routeParams$: Subscription;
	subConf = new Subject<boolean>();
	display = false;
	projectName: string;
	projectId: SchemeID;
	isActiveChartDataset$: Observable<boolean>;

	disconnect: () => void;

	selectedStep: StepperStep;
	viewElements: ElementRef[];
	stepperSteps: StepperStep[];
	stepperErrors = []; // [2, 1];

	@ViewChildren('viewItem', { read: ElementRef })
	viewItems: QueryList<any>;
	viewItemsList: ElementRef[];

	@HostListener('window:scroll', ['$event'])
	onScrollEvent() {
		const scrollPosition = window.pageYOffset;
		for (const i in this.viewItemsList) {
			if (this.viewItemsList[i]) {
				const position =
					this.viewItemsList[i].nativeElement.offsetTop - 300;
				if (scrollPosition >= position) {
					this.selectedStep = this.stepperSteps.find(
						el => el.id === +i + 1
					);
				}
			}
		}
	}

	updateViewChildren(): void {
		if (this.viewItemsList) {
			this.viewItemsList = this.viewItems.toArray();
		}
	}

	isDataset(): boolean {
		this.updateViewChildren();
		return this.showTable;
	}

	isCharts(): boolean {
		this.updateViewChildren();
		return this.showCharts && this.isChartsReady && this.showTable;
	}

	getSteps(data) {
		this.stepperSteps = data;
	}

	ngAfterViewInit() {
		this.viewItemsList = this.viewItems.toArray();
	}

	constructor(
		private storeService: StoreService,
		private route: ActivatedRoute
	) {}

	showDialog() {
		this.display = true;
	}

	accept() {
		this.display = false;
		this.subConf.next(true);
	}

	reject() {
		this.display = false;
		this.subConf.next(false);
	}

	canDeactivate(): Observable<boolean> {
		this.showDialog();
		return this.subConf;
	}

	ngOnInit() {
		this.routeParams$ = this.route.params.subscribe(
			(params: { id?: number }) => {
				const { id } = params;

				if (id) {
					this.storeService.dispatch(
						new LoadOneProject({ projectId: id + '' })
					);
				} else {
					this.storeService.dispatch(new CreateDraftProject());
				}
			}
		);

		this.isActiveChartDataset$ = this.storeService.createSubscription(isActiveChartDataset());

		this.disconnect = this.storeService.connect([
			{
				subscriber: prj => {
					if (prj) {
						this.projectId = prj.id;
						this.projectName = prj.name;
					}
				},
				selector: project()
			},
			{
				selector: isProjectDataset(),
				subscriber: t => {
					this.showTable = t;
				}
			},
			{
				selector: isRequiredDimensionMatched(),
				subscriber: t => {
					this.showCharts = t;
				}
			},
			{
				selector: isChartsReady(),
				subscriber: t => {
					this.isChartsReady = t;
				}
			}
		]);
	}

	ngOnDestroy() {
		this.disconnect();
		this.routeParams$.unsubscribe();
	}

	getIsActiveChartDataset() {
		return this.isActiveChartDataset$;
	}

	changeProjectName(name) {
		this.storeService.dispatch(
			new ProjectsActions.ChangeProjectName({
				id: this.projectId,
				name: name
			})
		);
	}
}
