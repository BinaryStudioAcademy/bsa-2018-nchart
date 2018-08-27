import { SchemeID } from '@app/models/normalizr.model';
import {
	NormalizedSchemeWithFetching,
	NormalizedSchemeField
} from '@app/models/normalizr.model';

export type ChartsState<R = undefined> = NormalizedSchemeWithFetching<
	Chart<SchemeID[], SchemeID[]>,
	R
>;

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
	sysName: string;
}

export interface DimensionColumnMap {
	columnIds: SchemeID[];
	id: SchemeID;
}

export interface Chart<D = DimensionOption[], C = CustomizeOption[]> {
	id: SchemeID;
	type: string;
	name: string;
	sysName: string;
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

export interface DefaultChartSettingsState {
	dimensionSettings: NormalizedSchemeField<DimensionOption>;
	customizeSettings: NormalizedSchemeField<CustomizeOption>;
}
