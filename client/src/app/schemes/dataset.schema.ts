import { schema } from 'normalizr';

const datasetColumnsScheme = new schema.Entity('datasetColumn');
const datasetDataScheme = new schema.Array(new schema.Entity('datasetData'));

export const datasetScheme = new schema.Entity('dataset', {
	modified: {
		columns: [datasetColumnsScheme],
		data: [datasetDataScheme]
	}
});
