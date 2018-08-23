const schemaValidationService = require('../../common/services/schema-validation.service');
const {
	fullProjectSchema
} = require('../../entities/project/project.schemas/projects.schema');

const validationMiddleware = (req, res, next) => {
	if (req.body.project) {
		const errors = schemaValidationService(req.body.project, fullProjectSchema);
		if (errors !== null) {
		    // todo: errors in console too
			next();
			throw errors;
		}
	}
	next();
};

module.exports = validationMiddleware;
