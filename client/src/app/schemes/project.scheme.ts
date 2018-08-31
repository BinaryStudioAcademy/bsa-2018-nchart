import { schema } from 'normalizr';
import { chartScheme } from '@app/schemes/chart.schema';
import { datasetScheme } from '@app/schemes/dataset.schema';

export const projectScheme = new schema.Entity(
	'project',
	{
		datasets: [datasetScheme],
		charts: [chartScheme]
	},
	{
		idAttribute: 'id'
	}
);

export const arrayOfProjectsScheme = new schema.Array(projectScheme);
