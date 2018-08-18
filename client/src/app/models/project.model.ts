import { SchemeID } from '@app/models/normalizr.model';

export interface Project {
	id: string;
	name: string;
	datasets: SchemeID[];
	charts: SchemeID[];
	createdAt: string | number;
	isDraft: boolean;
}
