import { Injectable } from '@angular/core';
import { OptionalType, fieldsValidators } from '@app/models';
import { FormService } from '@app/services/form.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { minValidator } from '@app/shared/components/form-field/form-validators';
import { PieChartCustomize } from '@app/models/pie-chart.model';

@Injectable()
export class PieChartService {
	constructor(
		private formService: FormService,
		private formBuilder: FormBuilder
	) {}

	data: any[];

	static arrayToObject(data: any[]) {
		const dataObj = data.reduce((obj, item) => {
			item.values.length
				? (obj[item.name] = item.values)
				: (obj[item.name] = []);
			return obj;
		}, {});
		return dataObj;
	}

	static mapData(original: any[]) {
		let id = 1;
		return original.map(obj => ({
			label: id++,
			name: obj.name,
			value: obj.value
		}));
	}

	static concat(...args) {
		return args.reduce((acc, val) => [...acc, ...val]);
	}

	getData(data: any) {
		const dataObj = PieChartService.arrayToObject(data);
		dataObj.arcs.forEach(el => {
			el.values = el.values.map(value => {
				return {
					name: el.name,
					value: value
				};
			});
		});

		let arcsData = [];
		dataObj.arcs.forEach(el => {
			arcsData.push(el.values);
		});
		const temp = [];
		arcsData.forEach(el => {
			el = PieChartService.mapData(el);
			temp.push(el);
		});
		arcsData = PieChartService.concat(...temp);
		this.data = arcsData;
		return this.data;
	}

	createPieChartCustomizeForm(pieChartCustomize): FormGroup {
		const initialValues: OptionalType<
			PieChartCustomize
		> = new PieChartCustomize(
			pieChartCustomize.width.value,
			pieChartCustomize.margin.value,
			pieChartCustomize.radius.value,
			pieChartCustomize.isDonut.value,
			pieChartCustomize.sortChartsBy.value,
			pieChartCustomize.sortArcsBy.value,
			pieChartCustomize.showValues.value
		);

		const validators: fieldsValidators<PieChartCustomize> = {
			width: [minValidator('Minimum value is', 0)],
			margin: [minValidator('Minimum value is', 0)],
			radius: [minValidator('Minimum value is', 0)],
			isDonut: [],
			sortChartsBy: [],
			sortArcsBy: [],
			showValues: []
		};

		const controls = this.formService.createFormControls(
			initialValues,
			validators
		);
		return this.formBuilder.group(controls);
	}
}
