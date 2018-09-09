import { Component, Input, OnChanges } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { ChangeCustomSettings } from '@app/store/actions/charts/charts.actions';
@Component({
	selector: 'app-world-map-chart-customize',
	templateUrl: './world-map-chart-customize.component.html',
	styleUrls: ['./world-map-customize.component.sass']
})
export class WorldMapChartCustomizeComponent implements OnChanges {
	@Input()
	formGroup: any;
	@Input()
	customizeSettings: any;

	isRegion = false;

	constructor(private storeService: StoreService) {}

	chooseProjection = [
		{ label: 'Robinson', value: 'robinson' },
		{ label: 'Hammer Retroazimuthal', value: 'hammerRetroazimuthal' },
		{ label: 'Mercator', value: 'mercator' },
		{ label: 'Transverse Mercator', value: 'transverseMercator' },
		{ label: 'Azimuthal Equal Area', value: 'azimuthalEqualArea' },
		{ label: 'Azimuthal Equidistant', value: 'azimuthalEquidistant' },
		{ label: 'Gnomonic', value: 'gnomonic' },
		{ label: 'Orthographic', value: 'orthographic' },
		{ label: 'Stereographic', value: 'stereographic' },
		{ label: 'Albers', value: 'albers' },
		{ label: 'Conic Conformal', value: 'conicConformal' },
		{ label: 'Conic Equal Area', value: 'conicEqualArea' },
		{ label: 'Rquirectangular', value: 'equirectangular' },
		{ label: 'Conic Equidistant', value: 'conicEquidistant' },
		{ label: 'Sinusoidal Raw', value: 'sinusoidalRaw' },
		{ label: 'Berghaus Star', value: 'berghausStar' }
	];

	chooseRegion = [
		{ label: 'World', value: 'world' },
		{ label: 'Europe', value: 'europe' },
		{ label: 'Asia', value: 'asia' },
		{ label: 'Africa', value: 'africa' },
		// { label: 'Australia', value: 'australia' },
		{ label: 'North America', value: 'northAmerica' },
		// { label: 'South America', value: 'southAmerica' },
		{ label: 'USA', value: 'usa' }
	];

	ngOnChanges() {
		/* if(this.formGroup.controls.chooseRegion.value === 'world'){
			this.formGroup.controls.rotate.enable();
			this.formGroup.controls.scale.enable();
			this.isRegion = false
		} else {
			this.formGroup.controls.rotate.disable();
			this.formGroup.controls.scale.disable();
			this.isRegion = true;
		}*/
		this.setIds();
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
	setIds() {
		this.formGroup.controls.width['id'] = this.customizeSettings.width.id;
		this.formGroup.controls.height['id'] = this.customizeSettings.height.id;
		this.formGroup.controls.rotate['id'] = this.customizeSettings.rotate.id;
		this.formGroup.controls.scale['id'] = this.customizeSettings.scale.id;
		this.formGroup.controls.showRaticule[
			'id'
		] = this.customizeSettings.showRaticule.id;
		this.formGroup.controls.chooseProjection[
			'id'
		] = this.customizeSettings.chooseProjection.id;
		this.formGroup.controls.chooseRegion[
			'id'
		] = this.customizeSettings.chooseRegion.id;
	}
}
