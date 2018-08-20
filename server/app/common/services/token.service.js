const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenService {
	constructor() {
		this.tokenSecret = null;
	}

	createToken(data) {
		this.tokenSecret = process.env.TOKEN;
		const tokenPayload = {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email
		};
		return jwt.sign(tokenPayload, this.tokenSecret, {
			expiresIn: process.env.TOKEN_TIME_EXP
		});
	}

	verifyToken(token) {
		this.tokenSecret = process.env.TOKEN;
		return new Promise((resolve, reject) => {
			jwt.verify(token, this.tokenSecret, (err, decoded) => {
				if (err) {
					return reject(err.message);
				}
				return resolve(decoded.email);
			});
		});
	}
}

module.exports = new TokenService();
