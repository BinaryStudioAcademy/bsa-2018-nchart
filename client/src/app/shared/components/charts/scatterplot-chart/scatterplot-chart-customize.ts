import { Component, Input, OnChanges } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { ChangeCustomSettings } from '@app/store/actions/charts/charts.actions';
@Component({
	selector: 'app-scatterplot-chart-customize',
	templateUrl: './scatterplot-chart-customize.html'
})
export class ScatterplotChartCustomizeComponent implements OnChanges {
	@Input()
	formGroup: any;
	@Input()
	customizeSettings: any;

	constructor(private storeService: StoreService) {}

	ngOnChanges() {
		this.formGroup.controls.width['id'] = this.customizeSettings.width.id;
		this.formGroup.controls.height['id'] = this.customizeSettings.height.id;
		this.formGroup.controls.maxRadius[
			'id'
		] = this.customizeSettings.maxRadius.id;
		this.formGroup.controls.setOrigin[
			'id'
		] = this.customizeSettings.setOrigin.id;
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
