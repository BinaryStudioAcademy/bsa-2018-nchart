const chartSchema = {
	type: 'object',
	additionalProperties: true,
	required: [
		'id',
		'chartTypeId',
		'datasetId',
		'dimensionSettings',
		'customizeSettings'
	],
	properties: {
		id: { type: ['string', 'null'] },
		chartTypeId: { type: 'number' },
		datasetId: { type: 'string' },
		dimensionSettings: { type: 'array' },
		customizeSettings: { type: 'array' }
	}
};

const chartsSchema = {
	type: 'array',
	items: chartSchema
};

module.exports = {
	chartSchema,
	chartsSchema
};
