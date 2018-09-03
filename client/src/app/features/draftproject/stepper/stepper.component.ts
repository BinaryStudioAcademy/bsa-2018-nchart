import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { isProjectDataset } from '@app/store/selectors/projects.selectors';
import { isRequiredDimensionMatched } from '@app/store/selectors/userCharts';
import { trigger, style, animate, transition } from '@angular/animations';
import { SchemeID } from '@app/models/normalizr.model';
import { activeProjectId } from '../../../store/selectors/projects.selectors';
import { SaveProject } from '../../../store/actions/projects/projects.actions';
import { isActiveChartDataset } from '@app/store/selectors/dataset.selectors';
import { isVerifiedToken } from '@app/store/selectors/user.selectors';
import { Go } from '@app/store/actions/router/router.actions';

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

interface StepperStep {
	id: number;
	scrollTo: string;
	name: string;
}

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.sass'],
	animations: [
		trigger('toggleStepper', [
			transition('void => *', [
				style({ transform: 'translateX(-100%)' }),
				animate('.3s ease-out')
			]),
			transition('* => void', [
				animate(200, style({ transform: 'translateX(-100%)' }))
			])
		])
	]
})
export class StepperComponent implements OnInit {
	@Input()
	selectedStep: StepperStep;
	@Input()
	errors: number[];

	btnMsg = 'Save';
	isAuth: boolean;
	stepsList = steps;
	stepIconClass: any;
	disableSaveBtn = true;
	stepsStageOne = true;
	stepsStageTwo = false;
	stepsStageThree = false;
	activeProjectId: SchemeID;

	isVisible = true;

	@Output()
	steps: EventEmitter<StepperStep[]> = new EventEmitter();

	constructor(private storeService: StoreService) {}

	isLoadingEl() {
		if (this.stepsStageTwo && this.stepsStageThree) {
			return true;
		}
		return false;
	}

	toggleStepper() {
		this.isVisible = !this.isVisible;
	}

	checkError(id) {
		return this.errors.find(el => el === id);
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
			'step-selected': id === this.selectedStep.id
		};
	}

	ngOnInit() {
		this.steps.emit(steps);
		this.selectedStep = this.stepsList[0];
		this.stepIconClass = this.getIconClasses(this.selectedStep.id);
		this.storeService.connect([
			{
				selector: isVerifiedToken(),
				subscriber: isAuth => {
					this.isAuth = isAuth;
					this.btnMsg = 'Save';
				}
			},
			{
				selector: isProjectDataset(),
				subscriber: isReady => {
					this.stepsStageTwo = isReady;
				}
			},
			{
				selector: isActiveChartDataset(),
				subscriber: isActive => {
					this.stepsStageOne = !isActive;
					if (isActive) {
						this.selectChart(2);
					} else {
						this.selectChart(1);
					}
				}
			},
			{
				selector: isRequiredDimensionMatched(),
				subscriber: isReady => {
					this.stepsStageThree = isReady;
					this.disableSaveBtn = !isReady;
				}
			},
			{
				selector: activeProjectId(),
				subscriber: id => {
					this.activeProjectId = id;
				}
			}
		]);
	}

	isStepVisible(id) {
		switch (id) {
			case 1:
				return this.stepsStageOne;
			case 2:
			case 3:
			case 4:
				return this.stepsStageTwo;
			case 5:
			case 6:
				return this.stepsStageThree;
		}
	}

	saveProject() {
		if (this.isAuth) {
			this.storeService.dispatch(
				new SaveProject({ id: this.activeProjectId })
			);
		} else {
			this.storeService.dispatch(new Go({ path: ['/login'] }));
		}
	}
}
