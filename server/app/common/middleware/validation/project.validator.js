const {
	fullProjectSchema
} = require('../../../entities/project/project.schemas/projects.schema');

const schemaValidationService = require('../../services/schema-validation.service');

class ProjectPayloadValidator {
	static fullSet(req, res, next) {
		const errors = schemaValidationService(
			req.body.project,
			fullProjectSchema
		);
		if (errors !== null) {
			return next(errors);
		}
		return next();
	}
}

module.exports = ProjectPayloadValidator;
