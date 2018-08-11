const ErrorService = require('../../common/services/error.service');

class GeneratePayload {
	constructor() {
		this.response = null;
	}

	generateSuccess(payload, data) {
		return this.setResponsePayload(payload, {
			payload: data,
			isSuccess: true,
			errors: []
		});
	}

	setResponsePayload(res, data) {
		res.locals.payload = data;
		this.response = res.locals.payload;
		return this.response;
	}

	getResponsePayload(res) {
		this.response = res.locals.payload;
		return this.response;
	}

	nextWithData(next, res) {
		return data => {
			this.generateSuccess(res, data);
			next();
		};
	}

	generateFailure(err) {
		this.response = {
			payload: null,
			isSuccess: false,
			errors: ErrorService.createCustomDBError(err)
		};
		return this.response;
	}
}

module.exports = new GeneratePayload();
