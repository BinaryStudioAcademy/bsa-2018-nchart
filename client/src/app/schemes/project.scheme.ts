import { schema } from 'normalizr';
import { chartScheme } from './chart.schema';
import { datasetScheme } from './dataset.schema';

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
