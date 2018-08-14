export interface DimensionOption {
	variable?: string;
	multiple?: boolean;
	required?: boolean;
	type?: string[];
	description?: string;
}

type gen = number | boolean | string;
type chartValue = gen | gen[];

export interface CustomizeOption {
	value?: chartValue;
	option?: string;
	description?: string;
}

export interface Chart {
	id?: number;
	type?: string;
	name?: string;
	description?: string;
	dimension_settings?: DimensionOption[];
	customize_settings?: CustomizeOption[];
}
