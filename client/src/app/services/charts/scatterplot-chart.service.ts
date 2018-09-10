import { Injectable } from '@angular/core';
import ColorHash from 'color-hash';
import { OptionalType, fieldsValidators } from '@app/models';
import { FormService } from '@app/services/form.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { minValidator } from '@app/shared/components/form-field/form-validators';
import {
	ScatterplotChartCustomize,
	ScatterplotChartDataObj
} from '@app/models/scatterplot-chart.model';
@Injectable()
export class ScatterplotChartService {
	constructor(
		private formService: FormService,
		private formBuilder: FormBuilder
	) {}

	data: any[];

	static arrayToObject(data: any[]): ScatterplotChartDataObj {
		const dataObj: ScatterplotChartDataObj = data.reduce((obj, item) => {
			item.values.length
				? (obj[item.name] = item.values[0].values)
				: (obj[item.name] = []);
			return obj;
		}, {});
		return dataObj;
	}

	static mapXAxis(original: any[]) {
		return original.map((val: number) => ({
			xAxis: val,
			yAxis: 1,
			size: 1,
			item: '',
			color: '#6C64B3'
		}));
	}
	static mapYAxis(original: any[], values: any[]) {
		if (values.length) {
			return original.map(obj => ({
				xAxis: obj.xAxis,
				yAxis: values[original.indexOf(obj)],
				size: obj.size,
				item: obj.item,
				color: obj.color
			}));
		} else {
			return original;
		}
	}

	static mapColors(original: any[], colors: any) {
		if (colors.length) {
			const colorHash = new ColorHash();
			return original.map(obj => ({
				xAxis: obj.xAxis,
				yAxis: obj.yAxis,
				size: obj.size,
				item: colors[original.indexOf(obj)] + '',
				color: colorHash.hex(colors[original.indexOf(obj)] + '')
			}));
		} else {
			return original;
		}
	}

	static mapSize(original: any[], sizes: any[]) {
		if (sizes.length) {
			return original.map(obj => ({
				xAxis: obj.xAxis,
				yAxis: obj.yAxis,
				size: sizes[original.indexOf(obj)],
				item: obj.item,
				color: obj.color
			}));
		} else {
			return original;
		}
	}

	getData(data: any) {
		const dataObj = ScatterplotChartService.arrayToObject(data);

		this.data = ScatterplotChartService.mapXAxis(dataObj.xaxis);
		this.data = ScatterplotChartService.mapYAxis(this.data, dataObj.yaxis);
		this.data = ScatterplotChartService.mapSize(this.data, dataObj.size);
		this.data = ScatterplotChartService.mapColors(this.data, dataObj.color);

		return this.data;
	}

	createCustomizeForm(scatterplotChartCustomize): FormGroup {
		const initialValues: OptionalType<
			ScatterplotChartCustomize
		> = new ScatterplotChartCustomize(
			scatterplotChartCustomize.width.value,
			scatterplotChartCustomize.height.value,
			scatterplotChartCustomize.maxRadius.value,
			scatterplotChartCustomize.setOrigin.value
		);

		const validators: fieldsValidators<ScatterplotChartCustomize> = {
			width: [minValidator('Minimum value is', 0)],
			height: [minValidator('Minimum value is', 0)],
			maxRadius: [minValidator('Minimum value is', 0)],
			setOrigin: [],
			colourScale: []
		};

		const controls = this.formService.createFormControls(
			initialValues,
			validators
		);
		return this.formBuilder.group(controls);
	}
}
