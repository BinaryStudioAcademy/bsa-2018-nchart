import { Injectable } from '@angular/core';
import ColorHash from 'color-hash';
@Injectable()
export class BarChartService {
	constructor() {}
	values: number[];
	data: any[];

	static arrayToObject(data: any[]) {
		const dataObj = data.reduce((obj, item) => {
			obj[item.name] = item.values;
			return obj;
		}, {});
		return dataObj;
	}

	static mapData(original: any[]) {
		return original.map((name: string | number) => ({
			name: name,
			value: 1,
			group: name,
			id: 1,
			color: '#69bf69'
		}));
	}

	static mapColors(original: any[], colors: any) {
		if (colors.length) {
			const colorHash = new ColorHash();
			return original.map(obj => ({
				name: obj.name,
				value: obj.value,
				group: obj.group,
				id: obj.id,
				color: colorHash.hex(colors[original.indexOf(obj)] + '')
			}));
		} else {
			return original;
		}
	}

	static mapValues(original: any[], values: any[]) {
		if (values.length) {
			return original.map(obj => ({
				name: obj.name,
				value: values[original.indexOf(obj)],
				group: obj.group,
				id: obj.id,
				color: obj.color
			}));
		} else {
			return original;
		}
	}

	static mapGroups(original: any[], groups: any[]) {
		if (groups.length) {
			return original.map(obj => ({
				name: obj.name,
				value: obj.value,
				group: groups[original.indexOf(obj)],
				id: obj.id,
				color: obj.color
			}));
		} else {
			return original;
		}
	}

	static mapGroupsId(original: any[], groups: any[]) {
		if (groups.length) {
			const ids = [];
			const map = BarChartService.mapGroups(original, groups);
			map.forEach((part, index) => {
				map[index].id = map[index].id = ids[part.group] = ids[
					part.group
				]
					? ids[part.group] + 1
					: 1;
			});
			return map;
		} else {
			return original;
		}
	}
	static compressArray(original) {
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
						id: '',
						color: ''
					};
					copy[w] = a;
				}
			}
			if (myCount > 0) {
				const a = {
					name: '',
					value: 0,
					group: '',
					id: '',
					color: ''
				};
				a.name = original[i].name;
				a.value = myCount;
				a.group = original[i].group;
				a.id = original[i].id;
				a.color = original[i].color;
				compressed.push(a);
			}
		}
		return compressed;
	}

	getData(data: any) {
		const dataObj = BarChartService.arrayToObject(data);
		this.data = BarChartService.mapData(dataObj.xaxis);
		this.data = BarChartService.mapValues(this.data, dataObj.size);
		this.data = BarChartService.mapGroupsId(this.data, dataObj.group);
		this.data = BarChartService.mapColors(this.data, dataObj.color);
		if (!dataObj.group.length) {
			this.data = BarChartService.compressArray(this.data);
		}

		return this.data;
	}
}
