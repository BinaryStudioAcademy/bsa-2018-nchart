const jwt = require('jsonwebtoken');
const _ = require('lodash');
require('dotenv').config();

// req.headers.authorization
const getUserFromToken = (req, res, next) => {
	if (req.headers.authorization) {
		const tokenSecret = process.env.TOKEN;
		const tokenPayload = req.headers.authorization;
		const pattern = /Bearer /;
		if (pattern.test(tokenPayload)) {
			const token = tokenPayload.slice(7);
			const decoded = jwt.decode(token, tokenSecret);
			res.locals.user = _.omit(decoded, 'iat', 'exp');
			next();
			return res.locals.user;
		}
		next();
	}
	return next();
};

module.exports = getUserFromToken;
