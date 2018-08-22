import { SchemeID } from '@app/models/normalizr.model';

export class Project {
	id: string = null;
	name: string = null;
	datasets: SchemeID[] = [];
	charts: SchemeID[] = [];
	createdAt: string | number = null;
	isDraft: boolean = null;
}
