import { SchemeID } from '@app/models/normalizr.model';
import { NormalizedSchemeField } from '@app/models/normalizr.model';

export type DatasetState = NormalizedSchemeField<Dataset>;

export class Dataset<C = SchemeID[], D = SchemeID[][]> {
	id: SchemeID = null;
	isDraft: boolean = null;
	modified: DatasetTable<C, D> = null;
	source: DatasetTable = null;
}

export interface DatasetColumn {
	id: SchemeID;
	title: string;
	type: string;
}

export interface DatasetTable<C = DatasetColumn[], D = any[][]> {
	id: SchemeID;
	columns?: C;
	data?: D;
}

export interface DatasetData {
	id: SchemeID;
	value: any;
}

export type DatasetColumnState = NormalizedSchemeField<DatasetColumn>;

export type DatasetDataState = NormalizedSchemeField<DatasetData>;
