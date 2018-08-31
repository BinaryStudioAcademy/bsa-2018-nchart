import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 } from 'uuid';
import {
	DatasetTable,
	Dataset,
	DatasetColumn,
	DatasetData
} from '@app/models/dataset.model';

@Injectable()
export class DatasetService {
	transformDatasets(
		datasets: DatasetTable[] = [],
		isDraft: boolean = true
	): Dataset<DatasetColumn[], DatasetData[][]>[] {
		return datasets.map(
			d =>
				({
					id: d.id,
					source: {
						...d
					},
					modified: {
						id: d.id,
						columns: [...d.columns],
						data: d.data.map((r, rI) =>
							r.map((c, cI) => ({
								id: `${rI}-${cI}-${d.id}`,
								value: c
							}))
						)
					},
					isDraft
				} as Dataset<DatasetColumn[], DatasetData[][]>)
		);
	}

	createDataset(
		columns: DatasetColumn[],
		data: any[][]
	): Observable<DatasetTable> {
		const dataset = {
			id: v4(),
			columns,
			data
		};
		return of(dataset);
	}
}
