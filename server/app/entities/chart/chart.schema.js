module.exports = {
	type: 'object',
	additionalProperties: true,
	required: ['id', 'chartTypeId', 'datasetId', 'dimensionSettings', 'customizeSettings'],
	properties: {
		id: { type: 'number' },
		chartTypeId: { type: 'number' },
		datasetId: { type: 'string' },
		dimensionSettings: { type: 'array' },
		customizeSettings: { type: 'array' }
	}
};
