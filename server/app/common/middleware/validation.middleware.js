const schemaValidationService = require('../../common/services/schema-validation.service');
const { userSchema, loginSchema } = require('../../entities/user/user.schema');
const { chartsSchema } = require('../../entities/chart/chart.schema');

const validationMiddleware = (req, res, next) => {
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
	if (req.body.charts) {
		const errors = schemaValidationService(req.body.charts, chartsSchema);
		if (errors !== null) {
			next(errors);
		}
	}
	next();
};

module.exports = validationMiddleware;
