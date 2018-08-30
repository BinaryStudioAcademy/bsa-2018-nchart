import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StoreService } from '@app/services/store.service';
import { ChangeCustomSettings } from '@app/store/actions/charts/charts.actions';
import { CustomizeControl } from '@app/models/customize-control.model';
@Component({
	selector: 'app-customize-chart',
	templateUrl: './customize-chart.component.html',
	styleUrls: ['./customize-chart.component.sass']
})
export class CustomizeChartComponent implements OnInit {
	@Input()
	form: FormGroup;
	@Input()
	customizeControls: CustomizeControl[];
	@Input()
	customizeSettings;

	constructor(private storeService: StoreService) {}

	ngOnInit() {}

	change() {
		if (this.form.valid) {
			const ids = [];
			for (const setting in this.customizeSettings) {
				if (this.customizeSettings.hasOwnProperty(setting)) {
					ids.push(this.customizeSettings[setting].id);
				}
			}
			const newCustom = {};
			for (const prop in this.form.value) {
				if (this.form.value.hasOwnProperty(prop)) {
					newCustom[ids.shift()] = this.form.value[prop];
				}
			}
			this.storeService.dispatch(new ChangeCustomSettings(newCustom));
		}
	}

	getStep(value: number): number {
		return value > 5 ? 1 : 0.1;
	}
}
