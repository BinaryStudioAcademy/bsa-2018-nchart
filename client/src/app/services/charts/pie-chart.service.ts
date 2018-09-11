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

	static mapLabels(original: any[], labels: string[]) {
		return original.map(obj => ({
			label: labels[original.indexOf(obj)],
			name: obj.name,
			value: obj.value
		}));
	}

	static compressArray(original) {
		const compressed = [];
		const copy = original.slice(0);
		for (let i = 0; i < original.length; i++) {
			let myCount = 0;
			for (let w = 0; w < copy.length; w++) {
				if (
					original[i].name === copy[w].name &&
					original[i].label === copy[w].label
				) {
					myCount += copy[w].value;
					const a = {
						label: '',
						name: '',
						value: 0
					};
					copy[w] = a;
				}
			}
			if (myCount > 0) {
				const a = {
					label: '',
					name: '',
					value: 0
				};
				a.label = original[i].label;
				a.name = original[i].name;
				a.value = +myCount.toFixed(10);
				compressed.push(a);
			}
		}
		return compressed;
	}

	static concat(...args) {
		if (args.length) {
			return args.reduce((acc, val) => [...acc, ...val]);
		} else {
			return [];
		}
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
		let temp = [];
		arcsData.forEach(el => {
			el = PieChartService.mapData(el);
			temp.push(el);
		});

		const arrLabels = [];
		if (dataObj.label.length) {
			temp.forEach(el => {
				el = PieChartService.mapLabels(el, dataObj.label[0].values);
				arrLabels.push(el);
			});
			temp = arrLabels;
		}
		arcsData = PieChartService.concat(...temp);
		if (dataObj.label.length && arcsData.length) {
			arcsData = PieChartService.compressArray(arcsData);
		}
		this.data = arcsData;
		return this.data;
	}

	createCustomizeForm(pieChartCustomize): FormGroup {
		const initialValues: OptionalType<
			PieChartCustomize
		> = new PieChartCustomize(
			pieChartCustomize.width.value,
			pieChartCustomize.margin.value,
			pieChartCustomize.radius.value,
			pieChartCustomize.columns.value,
			pieChartCustomize.isDonut.value,
			pieChartCustomize.sortChartsBy.value,
			pieChartCustomize.sortArcsBy.value,
			pieChartCustomize.showValues.value
		);

		const validators: fieldsValidators<PieChartCustomize> = {
			width: [minValidator('Minimum value is', 0)],
			margin: [minValidator('Minimum value is', 0)],
			radius: [minValidator('Minimum value is', 0)],
			columns: [minValidator('Minimum value is', 1)],
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
