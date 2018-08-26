import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { minValidator } from '@app/shared/components/form-field/form-validators';
import { StoreService } from '@app/services/store.service';
import { ChangeCustomSettings } from '@app/store/actions/charts/charts.actions';
import { getCustomizeSettings } from '@app/store/selectors/userCharts';
@Component({
	selector: 'app-customize-chart',
	templateUrl: './customize-chart.component.html',
	styleUrls: ['./customize-chart.component.sass']
})
export class CustomizeChartComponent implements OnInit, OnDestroy {
	form: FormGroup;

	customizeSettings = {};

	disconnect: () => void;
	customizeNumberProps = [];
	customizeBooleanProps = [];
	customizeArrayProps = [];

	constructor(private storeService: StoreService) {}

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
					// this.form.patchValue(this.form);
					// onChanges(this.form, this.storeService)
				}
			}
		]);
	}

	resetCustomizeProps() {
		this.customizeNumberProps = [];
		this.customizeBooleanProps = [];
		this.customizeArrayProps = [];
	}
	ngOnDestroy(): void {
		this.disconnect();
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

export function onChanges(form: FormGroup, storeService: StoreService) {
	form.valueChanges.subscribe(val => {
		if (form.valid) {
			const newCustom = {};
			/*for (const prop in val) {
				newCustom[prop.replace('set', '')] = val[prop];
			}*/
			storeService.dispatch(new ChangeCustomSettings(newCustom));
		}
	});
}
