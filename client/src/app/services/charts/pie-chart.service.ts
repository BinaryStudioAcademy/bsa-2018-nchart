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
