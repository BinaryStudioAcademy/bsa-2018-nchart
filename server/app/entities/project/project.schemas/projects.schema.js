const { chartsSchema } = require('../../chart/chart.schema');
const { datasetsSchema } = require('../../dataset/dataset.schema');

const projectSchema = {
	type: 'object',
	additionalProperties: true,
	required: ['id', 'name'],
	properties: {
		id: { type: ['number','null'] },
		name: { type: 'string' }
	}
};

const fullProjectSchema = {
	type: 'object',
	additionalProperties: true,
	required: ['id', 'name', 'datasets', 'charts'],
	properties: {
		id: { type: ['number', 'null'] },
		name: { type: 'string' },
		datasets: datasetsSchema,
		charts: chartsSchema
	}
};

module.exports = {
	projectSchema,
	fullProjectSchema
};
