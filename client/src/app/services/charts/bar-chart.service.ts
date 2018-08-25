import { BehaviorSubject } from 'rxjs';
import { BarChartCustomizeSettings } from '@app/shared/components/charts/bar-chart/bar-chart.model';
import { Injectable } from '@angular/core';
@Injectable()
export class BarChartService {
	barChartCustomizeSettings: BarChartCustomizeSettings = {
		set1: 800,
		set2: 600,
		set3: 40,
		set4: 20,
		set5: 0.2,
		set6: false
	};

	values: number[];

	data: any[];

	private _barChartCustomizeSettings = new BehaviorSubject<
		BarChartCustomizeSettings
	>(this.barChartCustomizeSettings);
	barChartCustomizeSettingsObs = this._barChartCustomizeSettings.asObservable();

	setCustomizeSettings(settings: BarChartCustomizeSettings) {
		this._barChartCustomizeSettings.next(settings);
	}

	getData(data: any) {
		if (data.length === 4) {
			if (data[0].values.length) {
				this.data = compressArray(mapData(data[0].values));
			}
			if (data[2].values.length) {
				let temp = mapData(data[0].values);
				temp = mapValues(temp, data[2].values);
				this.data = compressArray(temp);
			}
			if (data[1].values.length) {
				this.data = mapData(data[0].values);
				this.data = mapValues(this.data, data[2].values);
				this.data = mapGroupsId(this.data, data[1].values);
			}
			return this.data;
		}
	}

	constructor() {}
}

export function mapData(original: any[]) {
	return original.map((name: string | number) => ({
		name: name,
		value: 1,
		group: name,
		id: 1
	}));
}

export function mapValues(original: any[], values: any[]) {
	if (values.length) {
		return original.map(obj => ({
			name: obj.name,
			value: values[original.indexOf(obj)],
			group: obj.group,
			id: obj.id
		}));
	} else {
		return original;
	}
}

export function mapGroups(original: any[], groups: any[]) {
	if (groups.length) {
		return original.map(obj => ({
			name: obj.name,
			value: obj.value,
			group: groups[original.indexOf(obj)],
			id: obj.id
		}));
	} else {
		return original;
	}
}

export function mapGroupsId(original: any[], groups: any[]) {
	const ids = [];
	const map = mapGroups(original, groups);
	map.forEach((part, index) => {
		map[index].id = map[index].id = ids[part.group] = ids[part.group]
			? ids[part.group] + 1
			: 1;
	});
	return map;
}

/*export function mapColors(original: any[]) {
	return original.map(obj => ({
		name: obj.name,
		value: obj.value,
		color:
			'#' +
			Math.random()
				.toString(16)
				.substr(2, 6)
	}));
}*/

export function compressArray(original) {
	const compressed = [];
	const copy = original.slice(0);
	for (let i = 0; i < original.length; i++) {
		let myCount = 0;
		for (let w = 0; w < copy.length; w++) {
			if (original[i].name === copy[w].name) {
				myCount += copy[w].value;
				const a = {
					name: '',
					value: 0,
					group: '',
					id: ''
				};
				copy[w] = a;
			}
		}

		if (myCount > 0) {
			const a = {
				name: '',
				value: 0,
				group: '',
				id: ''
			};
			a.name = original[i].name;
			a.value = myCount;
			a.group = original[i].group;
			a.id = original[i].id;
			compressed.push(a);
		}
	}

	return compressed;
}
