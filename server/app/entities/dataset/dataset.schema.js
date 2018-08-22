module.exports = {
	type: 'object',
	additionalProperties: true,
	required: ['id', 'data', 'columns'],
	properties: {
		id: { type: 'string' },
		data: { type: 'array' },
		columns: { type: 'array' }
	}
};
