const ErrorService = require('./error.service');

class PayloadGeneratorService {
	static generateSuccess(res, data) {
		return PayloadGeneratorService.setResponsePayload(res, {
			payload: data,
			isSuccess: true,
			errors: []
		});
	}

	static setResponsePayload(res, data) {
		res.locals.payload = data;
	}

	static getResponsePayload(res) {
		return res.locals.payload;
	}

	static nextWithData(next, res) {
		return data => {
			PayloadGeneratorService.generateSuccess(res, data);
			next();
		};
	}

	static generateFailure(err) {
		const response = {
			payload: null,
			isSuccess: false,
			errors: ErrorService.createCustomDBError(err)
		};
		return response;
	}
}

module.exports = PayloadGeneratorService;
