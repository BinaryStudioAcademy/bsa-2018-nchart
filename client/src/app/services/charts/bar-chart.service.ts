import { Injectable } from '@angular/core';

@Injectable()
export class BarChartService {
	values: number[];
	data: any[];
	getData(data: any) {
		const dataObj = arrayToObject(data);

		this.data = mapData(dataObj.XAxis);
		this.data = mapValues(this.data, dataObj.Size);
		this.data = mapGroupsId(this.data, dataObj.Group);

		if (!dataObj.Group.length) {
			this.data = compressArray(this.data);
		}
		return this.data;
	}

	constructor() {}
}

export function arrayToObject(data: any[]) {
	const dataObj = data.reduce((obj, item) => {
		obj[item.name] = item.values;
		return obj;
	}, {});
	return dataObj;
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
	if (groups.length) {
		const ids = [];
		const map = mapGroups(original, groups);
		map.forEach((part, index) => {
			map[index].id = map[index].id = ids[part.group] = ids[part.group]
				? ids[part.group] + 1
				: 1;
		});
		return map;
	} else {
		return original;
	}
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
