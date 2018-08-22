module.exports = {
	type: 'object',
	additionalProperties: true,
	required: ['id', 'name'],
	properties: {
		id: { type: 'number' },
		name: { type: 'string' }
	}
};
