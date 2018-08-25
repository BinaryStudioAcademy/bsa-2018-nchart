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

	stepsList = [steps[0]];
	stepIconClass: any;
	disableSaveBtn = true;

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
				selector: isRequiredDimensionMatched(),
				subscriber: isReady => {
					if (isReady) {
						this.stepsList.push(steps[4]);
						this.stepsList.push(steps[5]);
						this.disableSaveBtn = false;
					}
				}
			}
		]);
	}
}
