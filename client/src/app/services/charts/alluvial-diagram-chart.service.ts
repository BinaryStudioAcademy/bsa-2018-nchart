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

	data: any[];

	getData(data: any) {}

	createCustomizeForm(alluvialDiagramChartCustomize): FormGroup {
		const initialValues: OptionalType<
			AlluvialDiagramChartCustomize
		> = new AlluvialDiagramChartCustomize(
			alluvialDiagramChartCustomize.width.value,
			alluvialDiagramChartCustomize.height.value,
			alluvialDiagramChartCustomize.nodeWidth.value,
			alluvialDiagramChartCustomize.nodePadding.value,
			alluvialDiagramChartCustomize.linksOpacity.value
		);

		const validators: fieldsValidators<AlluvialDiagramChartCustomize> = {
			width: [minValidator('Minimum value is', 0)],
			height: [minValidator('Minimum value is', 0)],
			nodeWidth: [minValidator('Minimum value is', 0)],
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
