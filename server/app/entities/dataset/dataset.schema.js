const datasetSchema = {
	type: 'object',
	additionalProperties: true,
	required: ['id', 'data', 'columns'],
	properties: {
		id: { type: 'string' },
		data: { type: 'array' },
		columns: { type: 'array' }
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
