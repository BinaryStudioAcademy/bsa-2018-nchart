const schemaValidationService = require('../../common/services/schema-validation.service');
const {
	fullProjectSchema
} = require('../../entities/project/project.schemas/projects.schema');
const { userSchema, loginSchema } = require('../../entities/user/user.schema');

const validationMiddleware = (req, res, next) => {
	if (req.body.project) {
		const errors = schemaValidationService(
			req.body.project,
			fullProjectSchema
		);
		if (errors !== null) {
			next(errors);
		}
	}
	if (req.body.user) {
		const errors = schemaValidationService(req.body.user, userSchema);
		if (errors !== null) {
			next(errors);
		}
	}
	if (req.body.email && req.body.password) {
		const errors = schemaValidationService(req.body, loginSchema);
		if (errors !== null) {
			next(errors);
		}
	}
	next();
};

module.exports = validationMiddleware;
