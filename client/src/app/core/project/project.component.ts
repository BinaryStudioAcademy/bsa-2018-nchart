import { Component, OnInit, OnDestroy, ElementRef, ViewChild, QueryList, HostListener, AfterViewInit, ViewChildren } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { LoadCharts } from '@app/store/actions/charts/charts.actions';
import { CreateDraftProject } from '@app/store/actions/projects/projects.actions';
import { isProjectDataset } from '@app/store/selectors/projects.selectors';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as ProjectsActions from '@app/store/actions/projects/projects.actions';
import { project } from '@app/store/selectors/projects.selectors';
import { SchemeID } from '@app/models/normalizr.model';


@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {
	showCharts = false;
	showTable = false;
	routeParams$: Subscription;

	projectName: string;
	projectId: SchemeID;

	selectedStep: any;
	viewElements: ElementRef[];
	stepperSteps: any;
	stepperErrors = [2];

	disconnect: () => void;

	@ViewChild('table', {read: ElementRef}) table: any;
	@ViewChild('charts', {read: ElementRef}) charts: any;
	@ViewChild('settings', {read: ElementRef}) settings: any;
	@ViewChild('chart', {read: ElementRef}) chart: any;
	@ViewChild('export', {read: ElementRef}) export: any;
	@ViewChild('load', {read: ElementRef}) load: any;

	@HostListener('window:scroll', ['$event']) onScrollEvent(evt) {
		const scrollPosition = window.pageYOffset;
		for (const i in this.viewElements) {
			if (this.viewElements[i]) {
				const position = this.viewElements[i].nativeElement.offsetTop - 300;
				if (scrollPosition >= position) {
					this.selectedStep = this.stepperSteps.find(el => el.scrollTo === ('#' + this.viewElements[i].nativeElement.id));
				}
			}
		}
	}

	getSteps(data) {
		this.stepperSteps = data;
	}

	ngAfterViewInit() {
		this.viewElements = [this.load, this.table, this.charts, this.settings, this.chart, this.export];
	}

	constructor(
		private storeService: StoreService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.routeParams$ = this.route.params.subscribe(
			(params: { id?: number }) => {
				const { id } = params;

				if (id) {
				} else {
					this.storeService.dispatch(new LoadCharts());
					this.storeService.dispatch(new CreateDraftProject());
				}
			}
		);

		this.storeService.connect([
			{
				subscriber: prj => {
					this.projectId = prj.id;
					this.projectName = prj.name;
				},
				selector: project()
			}
		]);

		this.disconnect = this.storeService.connect([
			{
				subscriber: isReady => {
					this.showTable = isReady;
				},
				selector: isProjectDataset()
			}
		]);
	}

	ngOnDestroy() {
		this.disconnect();
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
