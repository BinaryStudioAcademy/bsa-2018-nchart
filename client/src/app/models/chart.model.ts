import { SchemeID } from './normalizr.model';
import { Chart } from './chart.model';
import { NormalizedSchemeWithFetching } from './normalizr.model';

export type ChartsState<R = undefined> = NormalizedSchemeWithFetching<Chart, R>;


type Gen = number | boolean | string;
type chartValue = Gen | Gen[];

export interface DimensionOption {
	id: SchemeID;
	variable: string;
	multiple: boolean;
	required: boolean;
	type: string[];
	description: string;
}

export interface CustomizeOption {
	id: SchemeID;
	value: chartValue;
	option: string;
	description: string;
}

export interface DimensionColumnMap {
	columnId: SchemeID | SchemeID[];
	dimensionId: SchemeID;
}

export interface Chart {
	id: SchemeID;
	type: string;
	name: string;
	description: string;
	dimensionSettings: DimensionOption[];
	customizeSettings: CustomizeOption[];
}
