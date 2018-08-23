import { Component, OnInit, HostListener, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { project } from '@app/store/selectors/projects.selectors';
import { isProjectDataset, isProjectCharts } from '@app/store/selectors/projects.selectors';
import * as ProjectsActions from '@app/store/actions/projects/projects.actions';

export const steps = [
	{
		id: 1,
		scrollTo: '#load',
		name: 'Load data'
	},
	{
		id: 2,
		scrollTo: '#table',
		name: 'Data table'
	},
	{
		id: 3,
		scrollTo: '#charts',
		name: 'Choose Chart'
	},
	{
		id: 4,
		scrollTo: '#settings',
		name: 'Map dimensions'
	},
	{
		id: 5,
		scrollTo: '#chart',
		name: 'Customize'
	},
	{
		id: 6,
		scrollTo: '#export',
		name: 'Export'
	}
];

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.sass']
})
export class StepperComponent implements OnInit {
	@Input()
	selectedStep: any;
	@Input()
	errors: any[];

	projectId: any;
	projectName: string;

	stepsList = [steps[0]];
	// selectedStep = this.stepsList.find(el => el.id === this.selectedStepId);
	stepIconClass: any;
	disableSaveBtn = true;

	isVisible = true;

	@Output()
	steps: EventEmitter<any> = new EventEmitter();

	constructor(private storeService: StoreService) {}

	toggleStepper() {
		this.isVisible = !this.isVisible;
	}

	selectChart(id): void {
		this.selectedStep = this.stepsList.find(el => el.id === id);
	}

	getIconClasses(id) {
		const stepById = this.stepsList.find(el => el.id === id);
		return {
			fas: true,
			'fa-upload': 'Load data' === stepById.name,
			'fa-table': 'Data table' === stepById.name,
			'fa-chart-pie': 'Choose Chart' === stepById.name,
			'fa-arrows-alt': 'Map dimensions' === stepById.name,
			'fa-palette': 'Customize' === stepById.name,
			'fa-file-export': 'Export' === stepById.name,
			'fa-2x': true
		};
	}

	getClasses(id) {
		return {
			'step-icon': true,
			'step-selected': id === this.selectedStep.id,
			'step-error': id === this.errors.find(el => el === id)
		};
	}

	ngOnInit() {
		this.steps.emit(steps);
		this.selectedStep = this.stepsList[0];
		this.stepIconClass = this.getIconClasses(this.selectedStep.id);
		this.storeService.connect([
			{
				subscriber: prj => {
					this.projectId = prj.id;
					this.projectName = prj.name;
					this.storeService.dispatch(
						new ProjectsActions.CreateDraftProjectComplete({project: {
								id: this.projectId,
								name: 'name',
								datasets: ['fsadag', 'efsd'],
								charts: [],
								createdAt: '435',
								isDraft: true
							}
						})
					);
				},
				selector: project()
			},
			{
				subscriber: isReady => {
					if (isReady) {
						this.stepsList.push(steps[1]);
						this.stepsList.push(steps[2]);
						this.stepsList.push(steps[3]);
					}
				},
				selector: isProjectDataset()
			},
			{
				subscriber: isReady => {
					if (isReady) {
						this.stepsList.push(steps.find(el => el.name === 'Customize'));
						this.stepsList.push(steps.find(el => el.name === 'Export'));
						this.disableSaveBtn = false;
					}
				},
				selector: isProjectCharts()
			}
		]);
	}
}
