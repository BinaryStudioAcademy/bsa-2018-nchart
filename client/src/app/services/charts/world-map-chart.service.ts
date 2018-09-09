import { Injectable } from '@angular/core';
import { OptionalType, fieldsValidators } from '@app/models';
import { FormService } from '@app/services/form.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { minValidator } from '@app/shared/components/form-field/form-validators';
import { WorldMapChartCustomize } from '@app/models/world-map-chart.model';
import * as iso from 'i18n-iso-countries';

@Injectable()
export class WorldMapChartService {
	constructor(
		private formService: FormService,
		private formBuilder: FormBuilder
	) {}

	data: any[];

	static arrayToObject(data: any[]): any {
		const dataObj = data.reduce((obj, item) => {
			item.values.length
				? (obj[item.name] = item.values[0])
				: (obj[item.name] = []);
			return obj;
		}, {});
		return dataObj;
	}

	static mapData(original: any[]) {
		return original.map((name: string) => ({
			id: iso.getAlpha3Code(name, 'en'),
			name: name,
			value: NaN
		}));
	}

	static mapValues(original: any[], values) {
		if (values.length) {
			return original.map(obj => ({
				id: obj.id,
				name: obj.name,
				value: values[original.indexOf(obj)]
			}));
		} else {
			return original;
		}
	}
	getData(data: any) {
		iso.registerLocale(require('i18n-iso-countries/langs/en.json'));
		const dataObj = WorldMapChartService.arrayToObject(data);
		this.data = WorldMapChartService.mapData(dataObj.countries.values);
		this.data = WorldMapChartService.mapValues(
			this.data,
			dataObj.values.values
		);
		return this.data;
	}

	createCustomizeForm(worldMapChartCustomize): FormGroup {
		const initialValues: OptionalType<
			WorldMapChartCustomize
		> = new WorldMapChartCustomize(
			worldMapChartCustomize.width.value,
			worldMapChartCustomize.height.value,
			worldMapChartCustomize.rotate.value,
			worldMapChartCustomize.scale.value,
			worldMapChartCustomize.showRaticule.value,
			worldMapChartCustomize.chooseProjection.value,
			worldMapChartCustomize.chooseRegion.value,
			worldMapChartCustomize.colourScale.value
		);

		const validators: fieldsValidators<WorldMapChartCustomize> = {
			width: [minValidator('Minimum value is', 0)],
			height: [minValidator('Minimum value is', 0)],
			rotate: [minValidator('Minimum value is', 0)],
			scale: [minValidator('Minimum value is', 0)],
			showRaticule: [],
			chooseProjection: [],
			chooseRegion: [],
			colourScale: []
		};

		const controls = this.formService.createFormControls(
			initialValues,
			validators
		);
		return this.formBuilder.group(controls);
	}
}
