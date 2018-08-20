import {Observable} from 'rxjs/index';
import {ResponseScheme} from '@app/models/response-scheme.model';
import {DatasetColumn} from '@app/models/dataset.model';

export interface DatasetDomain {
	loadByText({ text: string }): Observable<ResponseScheme<{
		columns?: DatasetColumn[];
		data?: any[][];
	}>>;
	loadByUrl({ link: string }): Observable<ResponseScheme<{
		columns?: DatasetColumn[];
		data?: any[][];
	}>>;
	loadByFile({ file: File}): Observable<ResponseScheme<{
		columns?: DatasetColumn[];
		data?: any[][];
	}>>;
}
