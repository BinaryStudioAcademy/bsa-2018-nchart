const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenService {
	constructor() {
		this.tokenSecret = null;
	}

	/**
	 * @param tokenPayload user payload object
	 * @return token string
	 */
	createToken(tokenPayload) {
		this.tokenSecret = process.env.TOKEN;
		return jwt.sign(tokenPayload, this.tokenSecret, {
			expiresIn: process.env.TOKEN_TIME_EXP
		});
	}

	/**
	 * @param tokenPayload user payload object
	 * @return Object: id,name,email,defaultGroupId,iat,exp
	 */
	verifyToken(tokenPayload) {
		this.tokenSecret = process.env.TOKEN;
		return new Promise((resolve, reject) => {
			jwt.verify(tokenPayload, this.tokenSecret, (err, decoded) => {
				if (err) {
					return reject(err.message);
				}
				return resolve(decoded);
			});
		});
	}
}

module.exports = new TokenService();
