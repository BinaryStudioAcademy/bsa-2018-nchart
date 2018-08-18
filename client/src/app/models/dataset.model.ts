import { SchemeID } from '@app/models/normalizr.model';
import { NormalizedSchemeWithoutAll } from '@app/models/normalizr.model';

export type DatasetState = NormalizedSchemeWithoutAll<Dataset>;

export interface Dataset {
	id: SchemeID;
	isDraft: boolean;
	modified: DatasetTable;
	source: DatasetTable;
}

interface Column {
	id: SchemeID;
	title: string;
	type: string;
}

export interface DatasetTable {
	id: SchemeID;
	columns?: Column[];
	data?: any[][];
}
