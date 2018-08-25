const { userSchema, loginSchema } = require('../../../entities/user/user.schema');
const schemaValidationService = require('../../services/schema-validation.service');

class UserPayloadValidator {
	static saveUser(req, res, next) {
		const errors = schemaValidationService(
			req.body.user,
			userSchema
		);
		if (errors !== null) {
			return next(errors);
		}
		return next();
	}

	static loginUser(req, res, next) {
		const errors = schemaValidationService(
			req.body,
			loginSchema
		);
		if (errors !== null) {
			return next(errors);
		}
		return next();
	}
}

module.exports = UserPayloadValidator;
