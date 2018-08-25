const { chartsSchema } = require('../../../entities/chart/chart.schema');
const schemaValidationService = require('../../services/schema-validation.service');

class ChartPayloadValidator {
	static chartsSet(req, res, next) {
		const errors = schemaValidationService(
			req.body.charts,
			chartsSchema
		);
		if (errors !== null) {
			return next(errors);
		}

		return next();
	}
}

module.exports = ChartPayloadValidator;
