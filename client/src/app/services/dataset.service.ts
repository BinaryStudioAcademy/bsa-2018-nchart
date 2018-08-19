import { Injectable } from '@angular/core';
import {
	DatasetTable,
	Dataset,
	DatasetColumn,
	DatasetData
} from '@app/models/dataset.model';

@Injectable()
export class DatasetService {
	normalizeDatasets(
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
}
