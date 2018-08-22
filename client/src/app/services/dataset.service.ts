import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
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
						data: d.data.map((c, cI) =>
							c.map((r, rI) => ({
								id: `${rI}-${cI}-${d.id}`,
								value: r
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
