import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { minValidator } from '@app/shared/components/form-field/form-validators';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { StoreService } from '@app/services/store.service';
import { getCustomizeSettings } from '@app/store/selectors/charts.selectors';
@Component({
	selector: 'app-customize-chart',
	templateUrl: './customize-chart.component.html',
	styleUrls: ['./customize-chart.component.sass']
})
export class CustomizeChartComponent implements OnInit {
	form: FormGroup;

	customizeSettings = {};

	disconnect: () => void;
	customizeNumberProps = [];
	customizeBooleanProps = [];
	customizeArrayProps = [];

	constructor(
		private barChartService: BarChartService,
		private storeService: StoreService
	) {}

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: getCustomizeSettings(),
				subscriber: t => {
					this.customizeSettings = t;
					this.resetCustomizeProps();
					this.form = setFormGroup(
						this.customizeSettings,
						this.customizeNumberProps,
						this.customizeBooleanProps,
						this.customizeArrayProps
					);
				}
			}
		]);
		onChanges(this.form, this.barChartService);
	}

	resetCustomizeProps() {
		this.customizeNumberProps = [];
		this.customizeBooleanProps = [];
		this.customizeArrayProps = [];
	}
}

export function setFormGroup(
	customizeSettings,
	customizeNumberProps,
	customizeBooleanProps,
	customizeArrayProps
) {
	const formDataObj = {};
	for (const prop of Object.keys(customizeSettings)) {
		if (isNumber(customizeSettings[prop].value)) {
			formDataObj[prop] = new FormControl(customizeSettings[prop].value, [
				minValidator('Minimum value is', 0)
			]);
			const numberProp = {
				option: customizeSettings[prop].option,
				control: formDataObj[prop],
				step: customizeSettings[prop].value > 5 ? 1 : 0.1
			};
			customizeNumberProps.push(numberProp);
		}
		if (isBoolean(customizeSettings[prop].value)) {
			formDataObj[prop] = new FormControl(customizeSettings[prop].value);
			const booleanProp = {
				option: customizeSettings[prop].option,
				control: formDataObj[prop]
			};
			customizeBooleanProps.push(booleanProp);
		}
		if (isArray(customizeSettings[prop])) {
			formDataObj[prop] = new FormControl(
				customizeSettings[prop][0].value
			);
			const arrayProp = {
				control: prop,
				options: customizeSettings[prop]
			};
			customizeArrayProps.push(arrayProp);
		}
	}
	const form = new FormGroup(formDataObj);
	return form;
}

export function isString(value) {
	return typeof value === 'string' || value instanceof String;
}

export function isNumber(value) {
	return typeof value === 'number' && isFinite(value);
}

export function isArray(value) {
	return value && typeof value === 'object' && value.constructor === Array;
}
export function isBoolean(value) {
	return typeof value === 'boolean';
}

export function onChanges(form: FormGroup, barChartService: BarChartService) {
	form.valueChanges.subscribe(val => {
		if (form.valid) {
			barChartService.setCustomizeSettings(val);
		}
	});
}
