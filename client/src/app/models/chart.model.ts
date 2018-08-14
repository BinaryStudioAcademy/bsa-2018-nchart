export interface DimensionOption {
	variable?: string;
	multiple?: boolean;
	required?: boolean;
	type?: string[];
	description?: string;
}

export interface CustomizeOption {
	value?: number;
	option?: string;
	description?: string;
}

export interface Chart {
	type?: number;
	name?: string;
	description?: string;
	dimension_settings?: DimensionOption[];
	customize_settings?: CustomizeOption[];
}
