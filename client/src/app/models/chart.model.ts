import { SchemeID, NormalizedSchemeField } from './normalizr.model';
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
	id: SchemeID;
}

export interface Chart<D = DimensionOption[], C = CustomizeOption[]> {
	id: SchemeID;
	type: string;
	name: string;
	description: string;
	dimensionSettings: D;
	customizeSettings: C;
}

export type CustomizeSettingsState = NormalizedSchemeField<CustomizeOption>;
export type DimensionSettingsState = NormalizedSchemeField<DimensionColumnMap>;

export interface UserChartSettingsState {
	dimensionSettings: DimensionSettingsState;
	customizeSettings: CustomizeSettingsState;
}
