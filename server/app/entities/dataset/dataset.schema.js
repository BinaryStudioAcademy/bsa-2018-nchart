const datasetSchema = {
	type: 'object',
	additionalProperties: true,
	required: ['id', 'data', 'columns'],
	properties: {
		id: { type: 'string' },
		data: { type: 'array' },
		columns: { type: 'array' },
		name: { type: 'string' },
		sample: { type: 'boolean' }
	}
};

const datasetsSchema = {
	type: 'array',
	items: datasetSchema
};

module.exports = {
	datasetSchema,
	datasetsSchema
};
