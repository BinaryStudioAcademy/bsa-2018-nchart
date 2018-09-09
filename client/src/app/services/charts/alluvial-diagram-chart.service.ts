import { Injectable } from '@angular/core';
import { OptionalType, fieldsValidators } from '@app/models';
import { FormService } from '@app/services/form.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { minValidator } from '@app/shared/components/form-field/form-validators';
import { AlluvialDiagramChartCustomize } from '@app/models/alluvial-diagram.model';
@Injectable()
export class AlluvialDiagramChartService {
	constructor(
		private formService: FormService,
		private formBuilder: FormBuilder
	) {}

	static arrayToObject(data: any[]) {
		const dataObj = data.reduce((obj, item) => {
			item.values.length
				? (obj[item.name] = item.values)
				: (obj[item.name] = []);
			return obj;
		}, {});
		return dataObj;
	}
	static mapValues(original: any[], values: any[]) {
		if (values.length) {
			let j = 0;
			for (let i = 0; i < original.length; i++) {
				original[i].value = values[j];
				j < values.length - 1 ? j++ : (j = 0);
			}
		}
		return original;
	}

	getData(data: any) {
		const steps = [];
		data = AlluvialDiagramChartService.arrayToObject(data);
		if (data.steps.length > 1) {
			for (let i = 0; i < data.steps.length - 1; i++) {
				const sourceArr = data.steps[i].values,
					targetArr = data.steps[i + 1].values;

				for (let j = 0; j < sourceArr.length; j++) {
					const node = {
						source: sourceArr[j],
						target: targetArr[j],
						value: 1
					};
					steps.push(node);
				}
			}
		}
		if (data.size.length) {
			AlluvialDiagramChartService.mapValues(steps, data.size[0].values);
		}
		return steps;
	}

	createCustomizeForm(alluvialDiagramChartCustomize): FormGroup {
		const initialValues: OptionalType<
			AlluvialDiagramChartCustomize
		> = new AlluvialDiagramChartCustomize(
			alluvialDiagramChartCustomize.width.value,
			alluvialDiagramChartCustomize.height.value,
			alluvialDiagramChartCustomize.nodesWidth.value,
			alluvialDiagramChartCustomize.nodePadding.value,
			alluvialDiagramChartCustomize.linksOpacity.value
		);
		const validators: fieldsValidators<AlluvialDiagramChartCustomize> = {
			width: [minValidator('Minimum value is', 0)],
			height: [minValidator('Minimum value is', 0)],
			nodesWidth: [minValidator('Minimum value is', 0)],
			nodePadding: [minValidator('Minimum value is', 0)],
			linksOpacity: [minValidator('Minimum value is', 0)]
		};

		const controls = this.formService.createFormControls(
			initialValues,
			validators
		);
		return this.formBuilder.group(controls);
	}
}
