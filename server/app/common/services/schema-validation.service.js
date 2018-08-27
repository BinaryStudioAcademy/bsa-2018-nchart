const Ajv = require('ajv');

function validate(obj, schema) {
	const ajv = new Ajv({ allErrors: true });
	const testObj = ajv.compile(schema);
	testObj(obj);
	return testObj.errors;
}

module.exports = validate;
