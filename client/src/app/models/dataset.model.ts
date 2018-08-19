import { SchemeID } from '@app/models/normalizr.model';
import { NormalizedSchemeWithoutAll } from '@app/models/normalizr.model';

export type DatasetState = NormalizedSchemeWithoutAll<Dataset>;

export class Dataset {
	id: SchemeID = null;
	isDraft: boolean = null;
	modified: DatasetTable = null;
	source: DatasetTable = null;
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
