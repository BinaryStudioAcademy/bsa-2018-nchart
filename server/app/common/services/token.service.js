const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenService {
	constructor() {
		this.tokenSecret = process.env.TOKEN;
	}

	createToken(data) {
		const tokenPayload = {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email
		};
		return jwt.sign(tokenPayload, this.tokenSecret, {
			expiresIn: 60 * 60
		});
	}

	verifyToken(token) {
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
