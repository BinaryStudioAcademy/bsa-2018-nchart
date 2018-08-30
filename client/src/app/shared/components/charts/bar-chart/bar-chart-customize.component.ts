import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { ChangeCustomSettings } from '@app/store/actions/charts/charts.actions';
@Component({
	selector: 'app-bar-chart-customize',
	templateUrl: './bar-chart-customize.component.html'
})
export class BarChartCustomizeComponent implements OnInit {
	@Input()
	formGroup: any;
	@Input()
	customizeSettings: any;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.formGroup.controls.width['id'] = this.customizeSettings.width.id;
		this.formGroup.controls.height['id'] = this.customizeSettings.height.id;
		this.formGroup.controls.leftMargin[
			'id'
		] = this.customizeSettings.leftMargin.id;
		this.formGroup.controls.verticalPadding[
			'id'
		] = this.customizeSettings.verticalPadding.id;
		this.formGroup.controls.horizontalPadding[
			'id'
		] = this.customizeSettings.horizontalPadding.id;
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
