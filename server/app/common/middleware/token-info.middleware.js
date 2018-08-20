const jwt = require('jsonwebtoken');
const _ = require('lodash');
require('dotenv').config();

class TokenMiddleWare {
	constructor() {
		this.tokenSecret = null;
	}

	getUserFromToken(tokenPayload, res) {
		this.tokenSecret = process.env.TOKEN;
		const decoded = jwt.decode(tokenPayload, this.tokenSecret);
		res.locals.user = _.omit(decoded, 'iat', 'exp');
		return res.locals.user;
	}
}

module.exports = new TokenMiddleWare();
