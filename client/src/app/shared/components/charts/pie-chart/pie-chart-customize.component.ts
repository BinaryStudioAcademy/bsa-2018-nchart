import { Component, Input, OnChanges } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { ChangeCustomSettings } from '@app/store/actions/charts/charts.actions';
@Component({
	selector: 'app-pie-chart-customize',
	templateUrl: './pie-chart-customize.component.html'
})
export class PieChartCustomizeComponent implements OnChanges {
	@Input()
	formGroup: any;
	@Input()
	customizeSettings: any;

	constructor(private storeService: StoreService) {}

	ngOnChanges() {
		this.formGroup.controls.width['id'] = this.customizeSettings.width.id;
		this.formGroup.controls.margin['id'] = this.customizeSettings.margin.id;
		this.formGroup.controls.radius['id'] = this.customizeSettings.radius.id;
		this.formGroup.controls.isDonut[
			'id'
		] = this.customizeSettings.isDonut.id;
		this.formGroup.controls.sortChartsBy[
			'id'
		] = this.customizeSettings.sortChartsBy.id;
		this.formGroup.controls.sortArcsBy[
			'id'
		] = this.customizeSettings.sortArcsBy.id;
		this.formGroup.controls.showValues[
			'id'
		] = this.customizeSettings.showValues.id;
	}

	change() {
		if (this.formGroup.valid) {
			const newCustom = {};
			for (const prop in this.formGroup.value) {
				if (this.formGroup.value.hasOwnProperty(prop)) {
					newCustom[
						this.formGroup.controls[prop].id
					] = this.formGroup.value[prop];
				}
			}
			this.storeService.dispatch(new ChangeCustomSettings(newCustom));
		}
	}
}
