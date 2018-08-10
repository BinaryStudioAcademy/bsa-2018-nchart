const PayloadGeneratorService = require('../services/payload-generator.service');

const successOrEmptyPayload = (req, res, next) => {
	const payload = PayloadGeneratorService.getResponsePayload(res);

	if (payload) {
		res.json(payload);
		res.end();
	} else {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	}
};

const errorPayload = (err, req, res, next) => {
	res.status(err.status || 500).json(
		PayloadGeneratorService.generateFailure(err)
	);
	next();
};

module.exports = {
	successOrEmptyPayload,
	errorPayload
};
