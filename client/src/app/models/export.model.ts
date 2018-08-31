import { SchemeID } from '@app/models/normalizr.model';

export enum ExportType {
	PDF = 'pdf',
	SVG = 'svg',
	PNG = 'png'
}

export interface ProjectExportPayload {
	id: SchemeID;
	type: ExportType;
	filename: string;
	svg: string;
}
