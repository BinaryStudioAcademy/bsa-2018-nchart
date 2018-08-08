require('dotenv').config();
const jwt = require('jsonwebtoken');

class TokenService {
	constructor() {
		this.token = process.env.TOKEN;
	}

	createToken(data) {
		const tokenPayload = {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email
		};
		return jwt.sign(tokenPayload, this.token, {
			expiresIn: 60 * 60
		});
	}
}

module.exports = new TokenService();
