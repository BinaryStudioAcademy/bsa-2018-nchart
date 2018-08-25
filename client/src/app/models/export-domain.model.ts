import { Observable } from 'rxjs';
import { SchemeID } from '@app/models/normalizr.model';
import { ExportType } from '@app/models/export.model';

export interface ExportDomain {
	exportProject(payload: {
		id: SchemeID;
		type: ExportType;
		filename: string;
	}): Observable<{
		filename: string;
		data: any;
	}>;
}
