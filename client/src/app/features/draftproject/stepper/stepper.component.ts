import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { isProjectDataset } from '@app/store/selectors/projects.selectors';
import { isRequiredDimensionMatched } from '@app/store/selectors/userCharts';
import { trigger, style, animate, transition } from '@angular/animations';

export const steps = [
	{
		id: 1,
		scrollTo: '#load',
		name: 'Load data'
	},
	{
		id: 2,
		scrollTo: '#charts',
		name: 'Choose Chart'
	},
	{
		id: 3,
		scrollTo: '#settings',
		name: 'Map dimensions'
	},
	{
		id: 4,
		scrollTo: '#chart',
		name: 'Customize'
	},
	{
		id: 5,
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

	stepsList = steps;
	stepIconClass: any;
	disableSaveBtn = true;
	stepsStageTwo = false;
	stepsStageThree = false;

	isVisible = true;

	@Output()
	steps: EventEmitter<StepperStep[]> = new EventEmitter();

	constructor(private storeService: StoreService) {}

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
				selector: isProjectDataset(),
				subscriber: isReady => {
					this.stepsStageTwo = isReady;
				}
			},
			{
				selector: isRequiredDimensionMatched(),
				subscriber: isReady => {
					this.stepsStageThree = isReady;
					this.disableSaveBtn = !isReady;
				}
			}
		]);
	}

	isStepVisible(id) {
		switch (id) {
			case 1:
				return true;
			case 2:
			case 3:
				return this.stepsStageTwo;
			case 4:
			case 5:
			case 6:
				return this.stepsStageThree;
		}
	}
}
